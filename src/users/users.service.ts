import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
};

// FIXME
const users: User[] = [
  {
    userId: 1,
    username: 'Alice',
    password: 'topsecret', // FIXME
  },
  {
    userId: 2,
    username: 'Bob',
    password: '123abc', // FIXME
  },
];

@Injectable()
export class UsersService {
  async findUserByName(username: string): Promise<User | undefined> {
    return users.find((user) => user.username === username);
  }
}
