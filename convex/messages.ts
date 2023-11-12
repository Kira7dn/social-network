import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const send = mutation({
  args: {
    body: v.string(),
    toId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }
    const fromId = identity.subject;
    const message = await ctx.db.insert("messages", {
      body: args.body,
      fromId: fromId,
      toId: args.toId,
    });
    return message;
  },
});

export const list = query({
  args: {
    toId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const fromId = identity.subject;
    const messages1 = await ctx.db
      .query("messages")
      .withIndex("by_from_to", (q) =>
        q.eq("fromId", fromId).eq("toId", args.toId)
      )
      .order("desc")
      .take(100);
    const messages2 = await ctx.db
      .query("messages")
      .withIndex("by_from_to", (q) =>
        q.eq("fromId", args.toId).eq("toId", fromId)
      )
      .order("desc")
      .take(100);
    const messages = messages1.concat(messages2);
    return messages.sort((a, b) => a._creationTime - b._creationTime);
  },
});
