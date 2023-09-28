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
    throw new Error(`Failed to update user: ${error.message}`);
  }
}
