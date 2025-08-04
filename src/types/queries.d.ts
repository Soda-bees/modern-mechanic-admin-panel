type Queries = {
    query_id: number;
    created_at: string;
    description: string;
    email: string;
    full_name: string;
    phone_number: string;
    scans: Scan[];
    status: string;
    user_id: number;
    workshop: IWorkshop
}