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
  messages: defineTable({
    body: v.string(),
    fromId: v.string(),
    toId: v.string(),
    seen: v.optional(v.boolean()),
  })
    .index("by_from_to", ["fromId", "toId"])
    .index("by_recipient", ["toId", "seen"]),
  workspace: defineTable({
    name: v.string(),
    title: v.optional(v.string()),
    period: v.optional(v.string()),
    description: v.optional(v.string()),
    createdBy: v.string(),
    members: v.optional(v.array(v.string())),
    iconImage: v.string(),
    coverImage: v.string(),
    tasks: v.optional(v.array(v.string())),
  }).index("by_createdBy", ["createdBy"]),
  task: defineTable({
    name: v.string(),
    description: v.string(),
    fromDate: v.string(),
    toDate: v.string(),
    taskGroup: v.string(),
    progress: v.float64(),
    assignTo: v.array(v.string()),
    createdBy: v.string(),
    comments: v.array(v.string()),
    workspace: v.id("workspace"),
  })
    .index("by_workspace", ["workspace"])
    .index("by_createdBy_assignTo", [
      "createdBy",
      "assignTo",
    ])
    .index("by_toDate", ["toDate"]),
});
