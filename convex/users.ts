import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const users = await ctx.db.query("users").collect();
    if (!users) {
      throw new Error("Not found");
    }
    return users;
  },
});

export const getOrCreate = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    const member = await ctx.db
      .query("users")
      .withIndex("by_convexId", (q) =>
        q.eq("convexId", userId)
      )
      .first();
    if (!member) {
      const newMember = await ctx.db.insert("users", {
        convexId: identity.subject,
        email: identity.email,
        fullname: identity.name ? identity.name : " ",
        imageUrl: identity.pictureUrl
          ? identity.pictureUrl
          : "",
        bio: "",
        onboarded: false,
      });
      const result = await ctx.db.get(newMember);
      return result;
    }
    return member;
  },
});

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    const user = await ctx.db
      .query("users")
      .withIndex("by_convexId", (q) =>
        q.eq("convexId", userId)
      )
      .first();
    if (!user) {
      return null;
    }
    return user;
  },
});
export const create = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const newMember = await ctx.db.insert("users", {
      convexId: identity.subject,
      email: identity.email,
      fullname: identity.name ? identity.name : " ",
      imageUrl: identity.profileUrl
        ? identity.profileUrl
        : "",
      bio: "",
      onboarded: false,
    });
    return newMember;
  },
});

export const update = mutation({
  args: {
    id: v.id("users"),
    email: v.optional(v.string()),
    fullname: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    bio: v.optional(v.string()),
    onboarded: v.optional(v.boolean()),
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
    const user = await ctx.db.patch(args.id, {
      email: args.email,
      fullname: args.fullname,
      imageUrl: args.imageUrl,
      bio: args.bio,
      onboarded: args.onboarded,
    });
    return user;
  },
});
