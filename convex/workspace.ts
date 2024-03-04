import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_convexId", (q) =>
        q.eq("convexId", identity.subject)
      )
      .unique();
    if (!currentUser) {
      throw new Error("Not found");
    }
    const members = await ctx.db
      .query("members")
      .withIndex("by_user", (q) =>
        q.eq("user", currentUser._id)
      )
      .collect();
    return Promise.all(
      members.map(
        async (member) => await ctx.db.get(member.workspace)
      )
    );
  },
});

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_convexId", (q) =>
        q.eq("convexId", identity.subject)
      )
      .unique();
    if (!currentUser) {
      throw new Error("Not found");
    }
    const workspace = await ctx.db.insert("workspace", {
      name: args.name,
    });
    const member = await ctx.db.insert("members", {
      user: currentUser._id,
      workspace: workspace,
      role: "Admin",
      workOn: "All",
    });
    return { workspace, member };
  },
});
export const update = mutation({
  args: {
    id: v.id("workspace"),
    name: v.optional(v.string()),
    title: v.optional(v.string()),
    period: v.optional(v.string()),
    description: v.optional(v.string()),
    iconImage: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    tasks: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_convexId", (q) =>
        q.eq("convexId", identity.subject)
      )
      .unique();
    if (!currentUser) {
      throw new Error("Not found");
    }
    const existingWorkspace = await ctx.db.get(args.id);
    if (!existingWorkspace) {
      throw new Error("Not found");
    }
    const workspace = await ctx.db.patch(args.id, {
      name: args.name,
      title: args.title,
      period: args.period,
      description: args.description,
      iconImage: args.coverImage,
      coverImage: args.coverImage,
    });
    return workspace;
  },
});

export const remove = mutation({
  args: { id: v.id("workspace") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const existingWorkspace = await ctx.db.get(args.id);
    if (!existingWorkspace) {
      throw new Error("Not found");
    }
    const workspace = await ctx.db.delete(args.id);
    return workspace;
  },
});

export const getById = query({
  args: { workspaceId: v.id("workspace") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const workspace = await ctx.db.get(args.workspaceId);
    if (!workspace) {
      throw new Error("Not found");
    }
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const members = await ctx.db
      .query("members")
      .withIndex("by_workspace", (q) =>
        q.eq("workspace", args.workspaceId)
      )
      .collect()
      .then((members) =>
        Promise.all(
          members.map(async (member) => {
            return {
              ...member,
              user: await ctx.db.get(member.user),
            };
          })
        )
      );
    const result = {
      ...workspace,
      members,
    };
    return result;
  },
});
