export type Role = 'admin' | 'manager' | 'staff'
export type EnquiryStatus = 'Open' | 'Closed' | 'Converted'
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'On Hold'

export interface Profile {
    id: string
    full_name: string | null
    role: Role
    avatar_url: string | null
    updated_at: string | null
}

export interface Enquiry {
    id: string
    created_at: string
    name: string
    mobile: string | null
    email: string | null
    nature_of_enquiry: string | null
    remarks: string | null
    status: EnquiryStatus
    updated_at: string | null
}

export interface Client {
    id: string
    created_at: string
    trade_name: string
    legal_name: string | null
    pan: string | null
    aadhar: string | null
    gstin: string | null
    mobile: string | null
    email: string | null
    registration_type: string | null
    fee_structure: string | null
    updated_at: string | null
}

export interface ClientCredential {
    id: string
    client_id: string
    service_name: string
    encrypted_data: string
    created_at: string
    updated_at: string | null
}

export interface Task {
    id: string
    created_at: string
    client_id: string | null
    nature_of_work: string
    assigned_to: string | null
    status: TaskStatus
    remarks: string | null
    deadline: string | null
    updated_at: string | null
    // Joins
    client?: Client
    assignee?: Profile
}

export interface StaffUpdate {
    id: string
    created_at: string
    user_id: string
    date: string
    work_done: string
    remarks: string | null
    // Joins
    user?: Profile
}
