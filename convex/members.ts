import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: { workspaceId: v.id("workspace") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const members = await ctx.db
      .query("members")
      .withIndex("by_workspace", (q) =>
        q.eq("workspace", args.workspaceId)
      )
      .collect();
    if (!members) {
      throw new Error("Not found");
    }
    if (!identity) {
      throw new Error("Not authenticated");
    }
    return members;
  },
});

export const create = mutation({
  args: {
    workspaceId: v.id("workspace"),
    userId: v.string(),
    role: v.optional(v.string()),
    workOn: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const workspace = await ctx.db.get(args.workspaceId);
    if (!workspace) {
      throw new Error("Not found");
    }
    const member = await ctx.db.insert("members", {
      userId: args.userId,
      workspace: args.workspaceId,
      role: args.role,
      workOn: args.workOn,
    });
    return member;
  },
});

export const update = mutation({
  args: {
    id: v.id("members"),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
    role: v.optional(v.string()),
    workOn: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const existingMember = await ctx.db.get(args.id);
    if (!existingMember) {
      throw new Error("Not found");
    }
    const member = await ctx.db.patch(args.id, {
      role: args.role,
      workOn: args.workOn,
    });
    return member;
  },
});

export const remove = mutation({
  args: { id: v.id("members") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const existingMember = await ctx.db.get(args.id);
    if (!existingMember) {
      throw new Error("Not found");
    }
    const workspace = await ctx.db.delete(args.id);
    return workspace;
  },
});
