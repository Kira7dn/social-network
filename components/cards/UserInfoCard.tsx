import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

type Props = {};

const UserInfoCard = async (props: Props) => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  return (
    <>
      <div>
        <Image
          src={userInfo.image}
          alt={userInfo.name}
          width={20}
          height={20}
        />
      </div>
      <div></div>
    </>
  );
};

export default UserInfoCard;
