import type { UserType} from "@/types/user"

 export const Setusers: UserType[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  username: `user${index + 1}`,
  email: `user${index + 1}@example.com`,
  avatar: `https://example.com/avatar${index + 1}.png`,
  role: index % 2 === 0 ? 'user' : 'admin',
  createdAt: new Date(),
  lastLogin: index % 2 === 0 ? new Date() : undefined,
}));