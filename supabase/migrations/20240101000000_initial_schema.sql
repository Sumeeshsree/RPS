-- Create custom types
create type user_role as enum ('admin', 'manager', 'staff');
create type enquiry_status as enum ('Open', 'Closed', 'Converted');
create type task_status as enum ('Pending', 'In Progress', 'Completed', 'On Hold');

-- Create profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  role user_role default 'staff',
  avatar_url text,
  updated_at timestamp with time zone
);

-- Create enquiries table
create table public.enquiries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  mobile text,
  email text,
  nature_of_enquiry text,
  remarks text,
  status enquiry_status default 'Open',
  updated_at timestamp with time zone
);

-- Create clients table
create table public.clients (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  trade_name text not null,
  legal_name text,
  pan text,
  aadhar text,
  gstin text,
  mobile text,
  email text,
  registration_type text,
  fee_structure text,
  updated_at timestamp with time zone
);

-- Create client_credentials table (encrypted data)
create table public.client_credentials (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references public.clients on delete cascade not null,
  service_name text not null,
  encrypted_data text not null, -- Stores the ciphertext
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone
);

-- Create tasks table
create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  client_id uuid references public.clients on delete set null,
  nature_of_work text not null,
  assigned_to uuid references public.profiles(id) on delete set null,
  status task_status default 'Pending',
  remarks text,
  deadline timestamp with time zone,
  updated_at timestamp with time zone
);

-- Create staff_updates table
create table public.staff_updates (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date default current_date,
  work_done text not null,
  remarks text
);

-- Create inward_register table
create table public.inward_register (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  received_date date default current_date,
  sender text,
  type text,
  description text,
  csv_import_id text -- To track bulk imports
);

-- Create audit_logs table
create table public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  table_name text,
  record_id uuid,
  details jsonb
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.enquiries enable row level security;
alter table public.clients enable row level security;
alter table public.client_credentials enable row level security;
alter table public.tasks enable row level security;
alter table public.staff_updates enable row level security;
alter table public.inward_register enable row level security;
alter table public.audit_logs enable row level security;

-- Create policies (Basic setup, will refine)
-- Profiles: Users can view their own profile. Admins/Managers can view all.
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Enquiries: Viewable by all staff. Editable by all.
create policy "Enquiries viewable by authenticated users" on public.enquiries for select using (auth.role() = 'authenticated');
create policy "Enquiries insertable by authenticated users" on public.enquiries for insert with check (auth.role() = 'authenticated');
create policy "Enquiries updatable by authenticated users" on public.enquiries for update using (auth.role() = 'authenticated');

-- Clients: Viewable by all.
create policy "Clients viewable by authenticated users" on public.clients for select using (auth.role() = 'authenticated');
create policy "Clients insertable by authenticated users" on public.clients for insert with check (auth.role() = 'authenticated');
create policy "Clients updatable by authenticated users" on public.clients for update using (auth.role() = 'authenticated');

-- Client Credentials: Viewable by authenticated users (but data is encrypted).
create policy "Credentials viewable by authenticated users" on public.client_credentials for select using (auth.role() = 'authenticated');
create policy "Credentials insertable by authenticated users" on public.client_credentials for insert with check (auth.role() = 'authenticated');

-- Tasks: Viewable by all.
create policy "Tasks viewable by authenticated users" on public.tasks for select using (auth.role() = 'authenticated');
create policy "Tasks insertable by authenticated users" on public.tasks for insert with check (auth.role() = 'authenticated');
create policy "Tasks updatable by authenticated users" on public.tasks for update using (auth.role() = 'authenticated');

-- Staff Updates: Users can see their own. Admins/Managers can see all.
create policy "Staff updates viewable by self or admin" on public.staff_updates for select using (
  auth.uid() = user_id or 
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'manager'))
);
create policy "Staff updates insertable by self" on public.staff_updates for insert with check (auth.uid() = user_id);

-- Storage buckets
insert into storage.buckets (id, name, public) values ('client-docs', 'client-docs', false);
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

-- Storage policies
create policy "Client docs viewable by authenticated users" on storage.objects for select using (bucket_id = 'client-docs' and auth.role() = 'authenticated');
create policy "Client docs uploadable by authenticated users" on storage.objects for insert with check (bucket_id = 'client-docs' and auth.role() = 'authenticated');
create policy "Avatars viewable by public" on storage.objects for select using (bucket_id = 'avatars');
create policy "Avatars uploadable by authenticated users" on storage.objects for insert with check (bucket_id = 'avatars' and auth.role() = 'authenticated');

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'staff');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
