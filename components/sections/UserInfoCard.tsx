import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

type Props = {};

const UserInfoCard = async (props: Props) => {
  const user = await currentUser();
  if (!user) return null;

  return (
    <div className="flex flex-col my-4 mx-4 py-2 px-2 gap-6">
      {/* <div className="flex justify-start gap-2 items-start">
        <div className="items-center">
          <Image
            src={userInfo.image}
            alt={userInfo.name}
            width={42}
            height={42}
            className="rounded-full cursor-pointer"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-1">
            <h3 className="text-base-semibold font-bold">{userInfo.name}</h3>
            <Image
              src="/assets/verified.svg"
              alt="verified"
              width={16}
              height={16}
            />
          </div>
          <p className="text-subtle-medium text-gray-500">@{user.username}</p>
        </div>
      </div> */}
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <p className="text-subtle-semibold text-dark-1">2.5k</p>
          <p className="text-subtle-semibold text-dark-2">Follower</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-subtle-semibold text-dark-1">4</p>
          <p className="text-subtle-semibold text-dark-2">Workspace</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-subtle-semibold text-dark-1">80</p>
          <p className="text-subtle-semibold text-dark-2">Post</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-subtle-semibold text-dark-1">8</p>
          <p className="text-subtle-semibold text-dark-2">Task</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
