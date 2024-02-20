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
      seen: false,
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
    return messages.sort(
      (a, b) => a._creationTime - b._creationTime
    );
  },
});

export const getUnseen = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const toId = identity.subject;
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_recipient", (q) =>
        q.eq("toId", toId).eq("seen", false)
      )
      .order("desc")
      .collect();
    return messages;
  },
});

export const updateSeen = mutation({
  args: {
    id: v.id("messages"),
  },
  handler: async (ctx, args) => {
    // const identity = await ctx.auth.getUserIdentity();
    // if (!identity) {
    //   throw new Error("Not authenticated");
    // }
    // const toId = identity.subject;
    const existingMessage = await ctx.db.get(args.id);
    if (!existingMessage) {
      throw new Error("Not found");
    }
    // if (existingMessage.toId !== toId) {
    //   throw new Error("Unauthorized");
    // }
    const message = await ctx.db.patch(args.id, {
      seen: true,
    });
    return message;
  },
});

// Create query to get 3 last conversations, each conversation should have the last message, the number of unseen messages and the user info
export const getConversations = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const toId = identity.subject;
    const messages1 = await ctx.db
      .query("messages")
      .withIndex("by_recipient", (q) => q.eq("toId", toId))
      .collect();
    const messages2 = await ctx.db
      .query("messages")
      .withIndex("by_from_to", (q) => q.eq("fromId", toId))
      .collect();
    let messages = messages1.concat(messages2);
    messages = messages.sort(
      (a, b) => b._creationTime - a._creationTime
    );
    // Lọc trong messages ra lấy messages cuối cùng của mỗi conversation
    const lastMessages: string[] = [];
    const conversations = [];
    for (const message of messages) {
      if (
        !lastMessages.includes(
          message.fromId + message.toId
        )
      ) {
        lastMessages.push(message.fromId + message.toId);
        lastMessages.push(message.toId + message.fromId);
        conversations.push(message);
      }
    }
    return conversations;
  },
});
