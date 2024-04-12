import {
  defineSchema,
  defineTable,
} from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    userFullname: v.string(),
    userPicture: v.string(),
    isArchived: v.boolean(),
    parentDocument: v.optional(
      v.id('documents')
    ),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
  })
    .index('by_user', ['userId'])
    .index('by_user_parent', [
      'userId',
      'parentDocument',
    ]),
  posts: defineTable({
    user: v.id('users'),
    image: v.optional(v.string()),
    parent: v.optional(v.id('posts')),
    content: v.string(),
  })
    .index('by_user', ['user'])
    .index('by_parent', ['parent']),
  users: defineTable({
    convexId: v.string(),
    email: v.optional(v.string()),
    fullname: v.string(),
    imageUrl: v.optional(v.string()),
    bio: v.optional(v.string()),
    onboarded: v.optional(v.boolean()),
  }).index('by_convexId', ['convexId']),
  messages: defineTable({
    body: v.string(),
    from: v.id('users'),
    to: v.id('users'),
    seen: v.optional(v.boolean()),
  })
    .index('by_from_to', ['from', 'to'])
    .index('by_recipient', [
      'to',
      'seen',
    ]),
  workspace: defineTable({
    name: v.string(),
    title: v.optional(v.string()),
    period: v.optional(v.string()),
    description: v.optional(v.string()),
    iconImage: v.optional(v.string()),
    coverImage: v.optional(v.string()),
  }),
  members: defineTable({
    user: v.id('users'),
    workspace: v.id('workspace'),
    role: v.optional(v.string()),
    workOn: v.optional(v.string()),
  })
    .index('by_workspace', [
      'workspace',
    ])
    .index('by_user', ['user'])
    .index('by_user_workspace', [
      'user',
      'workspace',
    ]),
  tasks: defineTable({
    name: v.string(),
    description: v.string(),
    duration: v.object({
      from: v.float64(),
      to: v.float64(),
    }),
    taskGroup: v.string(),
    progress: v.number(),
    workspace: v.id('workspace'),
    executor: v.id('users'),
    initiator: v.optional(
      v.id('users')
    ),
    supporter: v.optional(
      v.id('users')
    ),
  })
    .index('by_workspace', [
      'workspace',
    ])
    .index('by_workspace_progress', [
      'workspace',
      'progress',
    ])
    .index('by_executor', ['executor'])
    .index('by_executor_workspace', [
      'executor',
      'workspace',
    ]),
  taskMembers: defineTable({
    user: v.id('users'),
    task: v.id('tasks'),
    role: v.union(
      v.literal('Executor'),
      v.literal('Initiator'),
      v.literal('Supporter ')
    ),
  })
    .index('by_task', ['task'])
    .index('by_user_role', [
      'user',
      'role',
    ])
    .index('by_user_task_role', [
      'user',
      'task',
      'role',
    ]),
})
