import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {
    userId: v.id("users"),
    friendId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const messages1 = await ctx.db
      .query("messages")
      .withIndex("by_from_to", (q) =>
        q.eq("from", args.userId).eq("to", args.friendId)
      )
      .order("desc")
      .take(100);
    const messages2 = await ctx.db
      .query("messages")
      .withIndex("by_from_to", (q) =>
        q.eq("from", args.friendId).eq("to", args.userId)
      )
      .order("desc")
      .take(100);
    const messages = messages1.concat(messages2);
    const sortMessages = messages.sort(
      (a, b) => a._creationTime - b._creationTime
    );
    return sortMessages;
  },
});
export const send = mutation({
  args: {
    body: v.string(),
    from: v.id("users"),
    to: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }
    const from = args.from;
    const message = await ctx.db.insert("messages", {
      body: args.body,
      from: from,
      to: args.to,
      seen: false,
    });
    return message;
  },
});

export const getUnseen = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_convexId", (q) =>
        q.eq("convexId", identity.subject)
      )
      .unique();
    if (!user) {
      throw new Error("User not found");
    }
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_recipient", (q) =>
        q.eq("to", user._id).eq("seen", false)
      )
      .order("desc")
      .collect();
    const fromIds: string[] = [];
    const unseenMessages = [];
    for (const message of messages) {
      if (!fromIds.includes(message.from)) {
        fromIds.push(message.from);
        unseenMessages.push(message);
      }
    }
    const messagesWithUserInfo = await Promise.all(
      unseenMessages.map(async (message) => {
        return {
          ...message,
          from: await ctx.db.get(message.from),
          to: await ctx.db.get(message.to),
        };
      })
    );
    return messagesWithUserInfo;
  },
});

export const updateSeen = mutation({
  args: {
    id: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const existingMessage = await ctx.db.get(args.id);
    if (!existingMessage) {
      throw new Error("Not found");
    }
    const message = await ctx.db.patch(args.id, {
      seen: true,
    });
    return message;
  },
});

export const getConversations = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_convexId", (q) =>
        q.eq("convexId", identity.subject)
      )
      .unique();
    if (!user) {
      throw new Error("User not found");
    }
    const messages1 = await ctx.db
      .query("messages")
      .withIndex("by_recipient", (q) =>
        q.eq("to", user._id)
      )
      .collect();
    const messages2 = await ctx.db
      .query("messages")
      .withIndex("by_from_to", (q) =>
        q.eq("from", user._id)
      )
      .collect();
    let messages = messages1.concat(messages2);
    messages = messages.sort(
      (a, b) => b._creationTime - a._creationTime
    );
    const lastMessages: string[] = [];
    const conversations = [];
    for (const message of messages) {
      if (
        !lastMessages.includes(message.from + message.to)
      ) {
        lastMessages.push(message.from + message.to);
        lastMessages.push(message.to + message.from);
        conversations.push(message);
      }
    }
    const users = await ctx.db.query("users").collect();
    const conversationsWithUserInfo = conversations.map(
      (conversation) => {
        return {
          ...conversation,
          from: users.find(
            (user) => user._id === conversation.from
          ),
          to: users.find(
            (user) => user._id === conversation.to
          ),
        };
      }
    );

    return conversationsWithUserInfo;
  },
});
