"use server";
import { revalidatePath } from "next/cache";
import { Thread } from "../models/thread.model";
import { connectDB } from "../mongoose";
import { Community } from "../models/community.model";
import User from "../models/user.model";

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  const skipAmount = (pageNumber - 1) * pageSize;
  try {
    connectDB();
    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ creataAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate("author")
      .populate("community")
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: "User",
          select: "_id name parentId image",
        },
      });
    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });
    const posts = await postsQuery.exec();
    const isNext = totalPostsCount > skipAmount + posts.length;
    return { posts, isNext };
  } catch (error: any) {
    throw new Error(`Failed to fetch threads: ${error.message}`);
  }
}

type ThreadParam = {
  content: string;
  author: string;
  communityId: string | null;
  path: string;
};

export async function createThread({
  content,
  author,
  communityId,
  path,
}: ThreadParam) {
  try {
    connectDB();
    const communityObject = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );
    const threadObject = await Thread.create({
      content: content,
      author: author,
      community: communityObject,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: threadObject },
    });
    if (communityObject) {
      await Community.findByIdAndUpdate(communityObject._id, {
        $push: { threads: threadObject },
      });
    }
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to update thread: ${error.message}`);
  }
}
async function fetchAllChildThreads(threadId: string): Promise<any[]> {
  const childThreads = await Thread.find({ parentId: threadId });
  const decendantThreads = [];
  for (const childThread of childThreads) {
    const decendants = await fetchAllChildThreads(childThread._id);
    decendantThreads.push(childThread, ...decendants);
  }
  return decendantThreads;
}

export async function deleteThread(threadId: string, path: string) {
  try {
    connectDB();
    const mainThread =
      await Thread.findById(threadId).populate("author community");
    if (!mainThread) throw new Error("Thread not found");
    // Fetch all child threads and their descendants recursively

    const decendantThreads = await fetchAllChildThreads(threadId);
    const decendantThreadIds = [
      threadId,
      ...decendantThreads.map((thread) => thread._id),
    ];
    // Extract the authorIds and communityIds to update User and Community models respectively

    const uniqueAuthorIds = new Set(
      [
        ...decendantThreads.map((thread) => thread.author?._id?.toString()),
        mainThread.author?._id?.toString(),
      ].filter((id) => id !== undefined)
    );
    const uniqueCommunityIds = new Set(
      [
        ...decendantThreads.map((thread) => thread.community?._id?.toString()),
      ].filter((id) => id !== undefined)
    );
    await Thread.deleteMany({ _id: { $in: decendantThreadIds } });
    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { threads: { $in: decendantThreadIds } } }
    );
    await Community.updateMany(
      { _id: { $in: Array.from(uniqueCommunityIds) } },
      { $pull: { threads: { $in: decendantThreadIds } } }
    );
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Fail to delete thread: ${error.message}`);
  }
}
