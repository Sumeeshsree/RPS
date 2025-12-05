-- Create enum for service status
create type service_status as enum ('Pending', 'In Progress', 'Completed', 'Rejected');

-- GST Registrations Table
create table service_gst_registrations (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references clients(id) on delete cascade not null,
  trade_name text not null,
  pan_number text not null,
  mobile text not null,
  email text not null,
  business_address text,
  documents_status jsonb default '{}'::jsonb, -- e.g. {"aadhar": true, "pan": false}
  status service_status default 'Pending',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- GST Amendments Table
create table service_gst_amendments (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references clients(id) on delete cascade not null,
  gstin text not null,
  amendment_type text not null, -- e.g. "Address Change", "Director Change"
  details text,
  status service_status default 'Pending',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Company Formations Table
create table service_company_formations (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references clients(id) on delete cascade not null,
  proposed_name_1 text not null,
  proposed_name_2 text,
  director_details jsonb default '[]'::jsonb, -- Array of director objects
  capital_amount numeric,
  status service_status default 'Pending',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Income Tax Filings Table
create table service_income_tax_filings (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references clients(id) on delete cascade not null,
  pan_number text not null,
  assessment_year text not null, -- e.g. "2024-25"
  acknowledgement_no text,
  status service_status default 'Pending',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table service_gst_registrations enable row level security;
alter table service_gst_amendments enable row level security;
alter table service_company_formations enable row level security;
alter table service_income_tax_filings enable row level security;

-- Policies (Authenticated users can view/create/update/delete)
-- GST Registrations
create policy "Enable all access for authenticated users" on service_gst_registrations
  for all using (auth.role() = 'authenticated');

-- GST Amendments
create policy "Enable all access for authenticated users" on service_gst_amendments
  for all using (auth.role() = 'authenticated');

-- Company Formations
create policy "Enable all access for authenticated users" on service_company_formations
  for all using (auth.role() = 'authenticated');

-- Income Tax Filings
create policy "Enable all access for authenticated users" on service_income_tax_filings
  for all using (auth.role() = 'authenticated');
