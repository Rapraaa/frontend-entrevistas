import { http } from './api';

export type UserProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string | null;
  role?: { name: string } | string;
  seniorityLevel?: { name: string } | string;
};

export async function getUser(id: string): Promise<UserProfile> {
  const { data } = await http.get(`/users/${id}`);
  return data;
}

export async function updateUser(
  id: string,
  input: Partial<Pick<UserProfile, 'firstName' | 'lastName' | 'profilePicture'>>,
): Promise<UserProfile> {
  const { data } = await http.patch(`/users/${id}`, input);
  return data;
}
