type Scan = {
  id: number;
  dtc_code: string;
  description: string;
  analysis: string;
  repair_instructions: string[];
  required_parts: string[];
  required_tools: string[];
  repair_difficulty: string;
  difficulty_color: string;
  difficulty_explanation: string;
  urgency_level: string;
  urgency_color: string;
  urgency_explanation: string;
  cost_estimate: string;
  user_notes: string;
  created_at: string;
  vehicle_id: number;
  vehicle_info: string;
  vehicle_image: string;
  youtube_videos: string[];
  user: User
};
