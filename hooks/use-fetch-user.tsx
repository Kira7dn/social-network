"use client";
import { api } from "@/convex/_generated/api";
import { useConvexAuth, useMutation } from "convex/react";
import { useEffect } from "react";
import { useCurrentUser } from "./use-currrent-user";

const useFetchUser = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user, onLoaded } = useCurrentUser();
  const getUser = useMutation(api.users.getOrCreate);
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      getUser().then((data) => {
        if (data) {
          onLoaded(data);
        }
      });
    }
  }, [getUser, isAuthenticated, isLoading, onLoaded]);
  if (!user) return null;
  return user;
};

export default useFetchUser;
