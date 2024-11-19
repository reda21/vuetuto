<template>
  <div>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia id excepturi temporibus culpa ut ducimus libero
      voluptates provident cumque repellat delectus, odit tenetur. Cupiditate quidem obcaecati dolor nostrum sint
      blanditiis!</p>
  </div>
  <pre>
    {{ user.all() }}
  </pre>
</template>

<script lang="ts" setup>
import { User } from "~/data/users"
import type { UserType } from "@/types/user"


const users: UserType[] = [
  {
    id: 1,
    username: "user1",
    email: "user1@example.com",
    avatar: "https://example.com/avatar1.png",
    role: "user",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    lastLogin: new Date("2024-11-01T08:00:00Z"),
  },
  {
    id: 2,
    username: "admin1",
    email: "admin1@example.com",
    avatar: "https://example.com/avatar2.png",
    role: "admin",
    createdAt: new Date("2024-02-01T12:00:00Z"),
  },
  {
    id: 3,
    username: "user2",
    email: "user2@example.com",
    avatar: "https://example.com/avatar3.png",
    role: "user",
    createdAt: new Date("2024-03-01T09:00:00Z"),
    lastLogin: new Date("2024-11-02T09:30:00Z"),
  },
  {
    id: 4,
    username: "admin2",
    email: "admin2@example.com",
    avatar: "https://example.com/avatar4.png",
    role: "admin",
    createdAt: new Date("2024-04-01T14:00:00Z"),
  },
  {
    id: 5,
    username: "user3",
    email: "user3@example.com",
    avatar: "https://example.com/avatar5.png",
    role: "user",
    createdAt: new Date("2024-05-01T16:00:00Z"),
    lastLogin: new Date("2024-11-03T18:00:00Z"),
  },
  {
    id: 6,
    username: "admin3",
    email: "admin3@example.com",
    avatar: "https://example.com/avatar6.png",
    role: "admin",
    createdAt: new Date("2024-06-01T20:00:00Z"),
  },
  {
    id: 7,
    username: "user4",
    email: "user4@example.com",
    avatar: "https://example.com/avatar7.png",
    role: "user",
    createdAt: new Date("2024-07-01T22:00:00Z"),
    lastLogin: new Date("2024-11-04T23:30:00Z"),
  },
  {
    id: 8,
    username: "admin4",
    email: "admin4@example.com",
    avatar: "https://example.com/avatar8.png",
    role: "admin",
    createdAt: new Date("2024-08-01T10:00:00Z"),
  },
  {
    id: 9,
    username: "user5",
    email: "user5@example.com",
    avatar: "https://example.com/avatar9.png",
    role: "user",
    createdAt: new Date("2024-09-01T12:00:00Z"),
    lastLogin: new Date("2024-11-05T15:00:00Z"),
  },
  {
    id: 10,
    username: "admin5",
    email: "admin5@example.com",
    avatar: "https://example.com/avatar10.png",
    role: "admin",
    createdAt: new Date("2024-10-01T18:00:00Z"),
  },
];

const copyUser: UserType = {
  id: 2,
  username: "redmax",
  email: "admin1@example.com",
  avatar: "https://example.com/avatar2.png",
  role: "admin",
  createdAt: new Date("2024-02-01T12:00:00Z"),
}

const user = new User<UserType>(users);

user.add(copyUser);

user.set(users)


//
</script>

<style></style>