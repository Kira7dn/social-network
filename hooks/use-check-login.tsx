"use client";
import { useEffect, useState } from "react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";

function useCheckLogIn() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const getUser = useMutation(api.users.getOrCreate);
  const [userInfo, setUserInfo] = useState<any>(null);
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      getUser().then((data) => {
        if (data) {
          setUserInfo(data);
        }
      });
    }
  }, [getUser, isLoading, isAuthenticated]);
  if (userInfo && !userInfo.onboarded)
    redirect("/onboarding");
}

export default useCheckLogIn;
