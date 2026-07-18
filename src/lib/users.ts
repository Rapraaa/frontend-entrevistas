import { http } from './api';

export type UserProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: { name: string } | string;
  seniorityLevel?: { name: string } | string;
};

export async function getUser(id: string): Promise<UserProfile> {
  const { data } = await http.get(`/users/${id}`);
  return data;
}
