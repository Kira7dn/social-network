import { Id } from "@/convex/_generated/dataModel";

export interface User {
  _id: Id<"users">;
  _creationTime?: number;
  email?: string;
  fullname: string;
  imageUrl?: string;
  bio?: string;
  onboarded?: boolean;
  convexId?: string;
}
export interface Message {
  _id: Id<"messages">;
  _creationTime: number;
  body: string;
  from: User | undefined;
  to: User | undefined;
  seen: boolean;
}
