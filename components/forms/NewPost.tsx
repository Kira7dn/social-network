import Image from "next/image";
import React from "react";

type Props = {};

const NewPost = (props: Props) => {
  return (
    <div className="bg-light-1 rounded-lg flex flex-col p-4">
      <div className="border-b-[2px] border-neutral-200 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-11 w-11 relative">
            <Image
              src="/assets/user.png"
              alt="user"
              fill
              className="rounded-full"
            />
          </div>
          <div className="grow max-w-lg h-full ">
            <form
              action=""
              className="flex gap-2 items-center justify-between "
            >
              <div className="rounded-xl bg-[#ECE6EB] grow">
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  className="ml-2 h-10 bg-transparent flex-1 w-full p-1 rounded-lg shadow-xs text-base text-dark-1 placeholder-dark-2 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="py-2 px-4 rounded-xl h-full bg-[#E5F1FF]"
              >
                <p className="text-base-semibold text-primary-500 ">Post</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
