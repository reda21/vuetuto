import { describe, beforeEach, it, expect } from 'vitest';
import { User, type UserType } from '~/data/users';

const users: UserType[] = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    avatar: 'https://example.com/avatar1.png',
    role: 'user',
    createdAt: new Date('2024-01-01T10:00:00Z'),
    lastLogin: new Date('2024-11-01T08:00:00Z'),
  },
  {
    id: 2,
    username: 'admin1',
    email: 'admin1@example.com',
    avatar: 'https://example.com/avatar2.png',
    role: 'admin',
    createdAt: new Date('2024-02-01T12:00:00Z'),
  },
  {
    id: 3,
    username: 'user2',
    email: 'user2@example.com',
    avatar: 'https://example.com/avatar3.png',
    role: 'user',
    createdAt: new Date('2024-03-01T09:00:00Z'),
    lastLogin: new Date('2024-11-02T09:30:00Z'),
  },
  {
    id: 4,
    username: 'admin2',
    email: 'admin2@example.com',
    avatar: 'https://example.com/avatar4.png',
    role: 'admin',
    createdAt: new Date('2024-04-01T14:00:00Z'),
  },
  {
    id: 5,
    username: 'user3',
    email: 'user3@example.com',
    avatar: 'https://example.com/avatar5.png',
    role: 'user',
    createdAt: new Date('2024-05-01T16:00:00Z'),
    lastLogin: new Date('2024-11-03T18:00:00Z'),
  },
  {
    id: 6,
    username: 'admin3',
    email: 'admin3@example.com',
    avatar: 'https://example.com/avatar6.png',
    role: 'admin',
    createdAt: new Date('2024-06-01T20:00:00Z'),
  },
  {
    id: 7,
    username: 'user4',
    email: 'user4@example.com',
    avatar: 'https://example.com/avatar7.png',
    role: 'user',
    createdAt: new Date('2024-07-01T22:00:00Z'),
    lastLogin: new Date('2024-11-04T23:30:00Z'),
  },
  {
    id: 8,
    username: 'admin4',
    email: 'admin4@example.com',
    avatar: 'https://example.com/avatar8.png',
    role: 'admin',
    createdAt: new Date('2024-08-01T10:00:00Z'),
  },
  {
    id: 9,
    username: 'user5',
    email: 'user5@example.com',
    avatar: 'https://example.com/avatar9.png',
    role: 'user',
    createdAt: new Date('2024-09-01T12:00:00Z'),
    lastLogin: new Date('2024-11-05T15:00:00Z'),
  },
  {
    id: 10,
    username: 'admin5',
    email: 'admin5@example.com',
    avatar: 'https://example.com/avatar10.png',
    role: 'admin',
    createdAt: new Date('2024-10-01T18:00:00Z'),
  },
];

describe('User class tests', () => {
  let user: User<UserType>;
  const data: UserType[] = [
    {
      id: 1,
      username: 'JohnDoe',
      email: 'john@example.com',
      role: 'user',
      createdAt: new Date(),
    },
    {
      id: 2,
      username: 'JaneDoe',
      email: 'jane@example.com',
      role: 'admin',
      createdAt: new Date(),
    },
  ];

  beforeEach(() => {
    user = new User();
    user.set(data);
  });

  it('should initialize with an empty user list', () => {
    expect(user.count()).toBe(2);
    expect(user.get()).toEqual(data);
  });

  it('should add a user', () => {
    const newUser: UserType = {
      id: 3,
      username: 'Alice',
      email: 'alice@example.com',
      role: 'user',
      createdAt: new Date(),
    };
    user.add(newUser);

    expect(user.count()).toBe(3);
    expect(user.find(3)).toEqual(newUser);
  });

  it('should update a user', () => {
    user.update(1, { username: 'UpdatedJohn' });
    const updatedUser = user.find(1);

    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.username).toBe('UpdatedJohn');
  });

  it('should delete a user by ID', () => {
    const deleted = user.delete(1);

    expect(deleted).toBe(true);
    expect(user.find(1)).toBeNull();
    expect(user.count()).toBe(1);
  });

  it('should find a user by username', () => {
    const foundUser = user.findBy('username', 'JaneDoe');

    expect(foundUser).not.toBeNull();
    expect(foundUser?.email).toBe('jane@example.com');
  });

  it('should return all usernames using pluckUsername', () => {
    const usernames = user.pluckUsername();

    expect(usernames).toEqual(['JohnDoe', 'JaneDoe']);
  });

  it('should return the first user', () => {
    const firstUser = user.first();

    expect(firstUser).not.toBeNull();
    expect(firstUser?.username).toBe('JohnDoe');
  });

  it('should return the last user', () => {
    const lastUser = user.last();

    expect(lastUser).not.toBeNull();
    expect(lastUser?.username).toBe('JaneDoe');
  });

  it('should clear all users', () => {
    user.clear();

    expect(user.count()).toBe(0);
    expect(user.all()).toEqual([]);
  });

  it('should handle addOrUpdate: update existing user', () => {
    user.addOrUpdate({
      id: 1,
      username: 'JohnUpdated',
      email: 'john@example.com',
      role: 'user',
      createdAt: new Date(),
    });

    const updatedUser = user.find(1);
    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.username).toBe('JohnUpdated');
    expect(user.count()).toBe(2);
  });

  it('should handle addOrUpdate: update an lot of users', () => {
    expect(user.count()).toBe(2);
    user.set(users);
    expect(user.count()).toBe(10);
    expect(user.find(2)).toEqual(users[1]);
    expect(user.find(2)?.username).toEqual('admin1');
  });

  it('should handle addOrUpdate: add new user', () => {
    const newUser: UserType = {
      id: 3,
      username: 'NewUser',
      email: 'newuser@example.com',
      role: 'user',
      createdAt: new Date(),
    };

    user.addOrUpdate(newUser);

    expect(user.count()).toBe(3);
    expect(user.find(3)).toEqual(newUser);
  });
});
