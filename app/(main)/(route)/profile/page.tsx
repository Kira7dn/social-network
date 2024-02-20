"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const DocumentsPage = () => {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image
          src="/assets/error.png"
          height="300"
          width="300"
          alt="Error"
          className="dark:hidden"
        />
        <Image
          src="/assets/error-dark.png"
          height="300"
          width="300"
          alt="Error"
          className="hidden dark:block"
        />
        <h2 className="text-xl font-medium">
          Something went wrong!
        </h2>
        <Button asChild>
          <Link href="/sign-in">Sign-in here</Link>
        </Button>
      </div>
    );
  }
  console.log(user);

  return (
    <div className="h-[90vh] flex flex-col items-center justify-center space-y-4">
      <p className="text-large-normal">
        Welcome
        <span className="text-primary text-large-bold">
          {" "}
          {user.fullName}
        </span>
      </p>
    </div>
  );
};

export default DocumentsPage;
