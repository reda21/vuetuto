export interface UserType {
  id: number;
  username: string;
  email: string;
  avatar?: string; 
  role: 'user' | 'admin';
  createdAt: Date;
  lastLogin?: Date;
}
