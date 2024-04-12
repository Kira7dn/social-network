import { v } from 'convex/values'

import {
  mutation,
  query,
} from './_generated/server'

export const create = mutation({
  args: {
    image: v.optional(v.string()),
    parent: v.optional(v.id('posts')),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity =
      await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error(
        'Not authenticated'
      )
    }

    const userId = identity.subject
    const user = await ctx.db
      .query('users')
      .withIndex('by_convexId', (q) =>
        q.eq('convexId', userId)
      )
      .unique()
    if (!user) {
      return null
    }

    const post = await ctx.db.insert(
      'posts',
      {
        image: args.image,
        parent: args.parent,
        content: args.content,
        user: user._id,
      }
    )

    return post
  },
})

export const remove = mutation({
  args: { id: v.id('posts') },
  handler: async (ctx, args) => {
    const identity =
      await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error(
        'Not authenticated'
      )
    }
    const userId = identity.subject
    const existingPost =
      await ctx.db.get(args.id)
    if (!existingPost) {
      throw new Error('Not found')
    }
    if (existingPost.user !== userId) {
      throw new Error('Unauthorized')
    }
    const post = await ctx.db.delete(
      args.id
    )
    return post
  },
})

export const getSearch = query({
  handler: async (ctx) => {
    const identity =
      await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error(
        'Not authenticated'
      )
    }
    const posts = await ctx.db
      .query('posts')
      .order('desc')
      .collect()
    return posts
  },
})
export const getPosts = query({
  args: {
    parent: v.optional(v.id('posts')),
  },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query('posts')
      .withIndex('by_parent', (q) =>
        q.eq('parent', args.parent)
      )
      .order('desc')
      .collect()
    const postsWithUser =
      await Promise.all(
        posts.map(async (post) => {
          const user = await ctx.db.get(
            post.user
          )
          if (user) {
            return {
              ...post,
              user,
            }
          }
        })
      )
    const filteredPosts =
      postsWithUser.filter(
        (post) => post !== undefined
      )
    return filteredPosts
  },
})

export const update = mutation({
  args: {
    id: v.id('posts'),
    image: v.optional(v.string()),
    content: v.optional(v.string()),
    parent: v.optional(v.id('posts')),
  },
  handler: async (ctx, args) => {
    const identity =
      await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Unauthenticated')
    }

    const userId = identity.subject
    const user = await ctx.db
      .query('users')
      .withIndex('by_convexId', (q) =>
        q.eq('convexId', userId)
      )
      .unique()
    if (!user) {
      throw new Error('Not found User')
    }

    const { id, ...rest } = args

    const existingDocument =
      await ctx.db.get(args.id)

    if (!existingDocument) {
      throw new Error('Not found')
    }

    if (
      existingDocument.user !== user._id
    ) {
      throw new Error('Unauthorized')
    }

    const post = await ctx.db.patch(
      args.id,
      {
        ...rest,
      }
    )

    return post
  },
})
