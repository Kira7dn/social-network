"use server";
import { clerkClient } from "@clerk/nextjs";

export async function getUsers() {
  let users = await clerkClient.users.getUserList();
  const plainUsers = users.map((user) => {
    return {
      id: user.id,
      username: user.username,
      name:
        user.firstName && user.lastName
          ? user.firstName + " " + user.lastName
          : user.username || "",
      imageUrl: user.imageUrl,
    };
  });
  return plainUsers;
}

export async function getUser(id: string) {
  let user = await clerkClient.users.getUser(id);
  return {
    id: user.id,
    username: user.username,
    name:
      user.firstName && user.lastName
        ? user.firstName + " " + user.lastName
        : user.username || "",
    imageUrl: user.imageUrl,
  };
}
