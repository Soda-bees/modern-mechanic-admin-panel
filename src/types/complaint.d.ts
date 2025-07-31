type Complaint = {
  id: number;
  full_name: string;
  email: string;
  description: string;
  phone_number: string;
  created_at: string;
  scan: Scan;
  user: User;
};
