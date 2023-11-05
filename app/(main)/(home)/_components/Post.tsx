import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Id } from "@/convex/_generated/dataModel";
import { createdTime } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

type Props = {
  post: {
    _id: Id<"documents">;
    _creationTime: number;
    content?: string | undefined;
    parentDocument?: Id<"documents"> | undefined;
    coverImage?: string | undefined;
    icon?: string | undefined;
    title: string;
    userId: string;
    userPicture: string;
    userFullname: string;
    isArchived: boolean;
    isPublished: boolean;
  };
};

function Post({ post }: Props) {
  let data = JSON.parse(post?.content || "");
  let timeStamp = createdTime(post._creationTime);
  return (
    <div className="flex flex-col rounded-md pt-2 bg-card w-full">
      <div className="flex items-center gap-4 flex-start px-4 py-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post?.userPicture} />
        </Avatar>
        <div>
          <p className="text-base-semibold">{post.userFullname}</p>
          <p className="text-subtle-medium">{timeStamp}</p>
        </div>
      </div>
      <p className="px-2">{`${post.icon} ${post.title}`}</p>
      {data.map(
        (item: {
          title: string;
          content: any;
          type: string;
          id: React.Key | null | undefined;
          props: {
            url: string | StaticImport;
            width: number;
          };
        }) => {
          if (item.type === "image") {
            return (
              <Image
                key={item.id}
                src={item.props.url}
                width={200}
                height={160}
                sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                className="h-full w-full pt-2"
                alt="image"
                objectFit="contain"
              />
            );
          }
          if (item.type === "paragraph") {
            if (!item.content[0]) return null;
            return (
              <p key={item.id} className="px-6">
                {item.content[0].text}
              </p>
            );
          }
        }
      )}
    </div>
  );
}

export default Post;
