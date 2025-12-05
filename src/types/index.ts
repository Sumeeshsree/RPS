export type Role = 'admin' | 'manager' | 'staff'
export type EnquiryStatus = 'Open' | 'Closed' | 'Converted'
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'On Hold'
export type ServiceStatus = 'Pending' | 'In Progress' | 'Completed' | 'Rejected'

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

// Office Services Interfaces

export interface ServiceGSTRegistration {
    id: string
    client_id: string
    trade_name: string
    pan_number: string
    mobile: string
    email: string
    business_address: string | null
    documents_status: Record<string, boolean>
    status: ServiceStatus
    notes: string | null
    created_at: string
    updated_at: string
    // Joins
    client?: Client
}

export interface ServiceGSTAmendment {
    id: string
    client_id: string
    gstin: string
    amendment_type: string
    details: string | null
    status: ServiceStatus
    notes: string | null
    created_at: string
    updated_at: string
    // Joins
    client?: Client
}

export interface ServiceCompanyFormation {
    id: string
    client_id: string
    proposed_name_1: string
    proposed_name_2: string | null
    director_details: any[] // JSONB array
    capital_amount: number | null
    status: ServiceStatus
    notes: string | null
    created_at: string
    updated_at: string
    // Joins
    client?: Client
}

export interface ServiceIncomeTaxFiling {
    id: string
    client_id: string
    pan_number: string
    assessment_year: string
    acknowledgement_no: string | null
    status: ServiceStatus
    notes: string | null
    created_at: string
    updated_at: string
    // Joins
    client?: Client
}
