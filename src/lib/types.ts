export type CatalogItem = {
  id: string;
  name: string;
  description?: string | null;
  isActive?: boolean;
  createdAt?: string;
};

export type Paginated<T> = {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
};

export type JwtUser = {
  id: string;
  email: string;
  role: string;
};

export type ChatMessage = {
  sequence: number;
  sender: 'ai' | 'user';
  content: string;
  code_snippet?: string | null;
  timestamp?: string;
};

export type Evaluation = {
  score?: number;
  general_feedback?: string;
  strengths?: string[];
  weaknesses?: string[];
  improvement_tips?: string[];
};

export type InterviewConfig = {
  interview_type: string;
  target_role: string;
  seniority: string;
  technologies: string[];
};

export type Interview = {
  _id: string;
  user_id: string;
  config: InterviewConfig;
  status: 'in_progress' | 'completed';
  chat_history: ChatMessage[];
  evaluation?: Evaluation;
  created_at?: string;
};
