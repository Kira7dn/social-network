"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectDB } from "../mongoose";

export async function fetchUser(userId: string) {
  try {
    connectDB();
    return await User.findOne({ id: userId }).populate("communities");
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

type UserParam = {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
};

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: UserParam) {
  try {
    connectDB();
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}
