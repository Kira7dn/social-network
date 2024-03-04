import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    userFullname: v.string(),
    userPicture: v.string(),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
  users: defineTable({
    convexId: v.string(),
    email: v.optional(v.string()),
    fullname: v.string(),
    imageUrl: v.optional(v.string()),
    bio: v.optional(v.string()),
    onboarded: v.optional(v.boolean()),
  }).index("by_convexId", ["convexId"]),
  messages: defineTable({
    body: v.string(),
    from: v.id("users"),
    to: v.id("users"),
    seen: v.optional(v.boolean()),
  })
    .index("by_from_to", ["from", "to"])
    .index("by_recipient", ["to", "seen"]),
  workspace: defineTable({
    name: v.string(),
    title: v.optional(v.string()),
    period: v.optional(v.string()),
    description: v.optional(v.string()),
    iconImage: v.optional(v.string()),
    coverImage: v.optional(v.string()),
  }),
  members: defineTable({
    user: v.id("users"),
    workspace: v.id("workspace"),
    role: v.optional(v.string()),
    workOn: v.optional(v.string()),
  })
    .index("by_workspace", ["workspace"])
    .index("by_user", ["user"])
    .index("by_user_workspace", ["user", "workspace"]),
  tasks: defineTable({
    name: v.string(),
    description: v.string(),
    fromDate: v.string(),
    toDate: v.string(),
    taskGroup: v.string(),
    progress: v.float64(),
    assignTo: v.array(v.id("users")),
    createdBy: v.id("users"),
    workspace: v.id("workspace"),
  })
    .index("by_workspace", ["workspace"])
    .index("by_createdBy_assignTo", [
      "createdBy",
      "assignTo",
    ])
    .index("by_toDate", ["toDate"]),
});
