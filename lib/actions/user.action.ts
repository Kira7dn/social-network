"use server";
import { revalidatePath } from "next/cache";
import { Thread } from "../models/thread.model";
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

export async function getActivity(userId: string) {
  try {
    connectDB();
    const threads = await Thread.find({ userId: userId });
    const childrenThreadIds = threads.reduce((acc, thread) => {
      return acc.concat(thread.children);
    }, []);
    const replies = await Thread.find({
      _id: { $in: childrenThreadIds },
      userId: { $ne: userId },
    }).populate({
      path: "authors",
      model: "User",
      select: "name image _id",
    });
    return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
  }
}
