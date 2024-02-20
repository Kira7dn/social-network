import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const list = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    const workspaces = await ctx.db
      .query("workspace")
      .collect();
    const result = [];
    for (const workspace of workspaces) {
      if (
        workspace.members?.includes(userId) ||
        workspace.createdBy === userId
      ) {
        result.push(workspace);
      }
    }
    return result;
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
    const userId = identity.subject;
    const workspace = await ctx.db.insert("workspace", {
      name: args.name,
      createdBy: userId,
      iconImage:
        "https://icon-library.com/images/white-icon/white-icon-3.jpg",
      coverImage:
        "https://icon-library.com/images/white-icon/white-icon-3.jpg",
    });
    return workspace;
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
    members: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    const existingWorkspace = await ctx.db.get(args.id);
    if (!existingWorkspace) {
      throw new Error("Not found");
    }
    if (existingWorkspace.createdBy !== userId) {
      throw new Error("Unauthorized");
    }
    const { id, ...rest } = args;
    const existingDocument = await ctx.db.get(args.id);
    if (!existingDocument) {
      throw new Error("Not found");
    }
    const workspace = await ctx.db.patch(args.id, {
      ...rest,
    });
    return workspace;
  },
});
export const removeIcon = mutation({
  args: { id: v.id("workspace") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const existingWorkspace = await ctx.db.get(args.id);

    if (!existingWorkspace) {
      throw new Error("Not found");
    }

    const workspace = await ctx.db.patch(args.id, {
      iconImage: undefined,
    });

    return workspace;
  },
});

export const removeCoverImage = mutation({
  args: { id: v.id("workspace") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const existingWorkspace = await ctx.db.get(args.id);

    if (!existingWorkspace) {
      throw new Error("Not found");
    }

    const workspace = await ctx.db.patch(args.id, {
      coverImage: undefined,
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

    const userId = identity.subject;

    const existingWorkspace = await ctx.db.get(args.id);

    if (!existingWorkspace) {
      throw new Error("Not found");
    }

    if (existingWorkspace.createdBy !== userId) {
      throw new Error("Unauthorized");
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
    return workspace;
  },
});
