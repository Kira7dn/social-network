import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: { workspaceId: v.id("workspace") },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("members")
      .withIndex("by_workspace", (q) =>
        q.eq("workspace", args.workspaceId)
      )
      .collect();
    if ((members.length = 0)) {
      return null;
    }
    const membersData = await Promise.all(
      members.map(async (member) => {
        return {
          ...member,
          user: await ctx.db.get(member.user),
        };
      })
    );
    return membersData;
  },
});

export const create = mutation({
  args: {
    workspaceId: v.id("workspace"),
    userId: v.id("users"),
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
      user: args.userId,
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
    user: v.optional(v.id("users")),
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
    const members = await ctx.db.delete(args.id);
    return members;
  },
});
