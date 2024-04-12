import { v } from 'convex/values'
import {
  mutation,
  query,
} from './_generated/server'

export const listByWorkspace = query({
  args: {
    workspaceId: v.id('workspace'),
  },
  handler: async (ctx, args) => {
    const identity =
      await ctx.auth.getUserIdentity()
    const tasks = await ctx.db
      .query('tasks')
      .withIndex('by_workspace', (q) =>
        q.eq(
          'workspace',
          args.workspaceId
        )
      )
      .collect()
    if (!tasks) {
      throw new Error('Not found')
    }
    if (!identity) {
      throw new Error(
        'Not authenticated'
      )
    }
    const taskData = await Promise.all(
      tasks.map(async (task) => {
        const executor =
          await ctx.db.get(
            task.executor
          )
        const supporter = task.supporter
          ? await ctx.db.get(
              task.supporter
            )
          : undefined
        const initiator = task.initiator
          ? await ctx.db.get(
              task.initiator
            )
          : undefined
        return {
          ...task,
          executor,
          supporter,
          initiator,
        }
      })
    )
    return taskData
  },
})
export const listTodayTask = query({
  args: {
    workspaceId: v.id('workspace'),
  },
  handler: async (ctx, args) => {
    const identity =
      await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error(
        'Not authenticated'
      )
    }
    const today = Math.floor(
      new Date().getTime()
    )
    const tasks = await ctx.db
      .query('tasks')
      .withIndex(
        'by_workspace_progress',
        (q) =>
          q
            .eq(
              'workspace',
              args.workspaceId
            )
            .lt('progress', 100)
      )
      .collect()
    const todayTasks = tasks.filter(
      (task) => {
        const from = task.duration.from
        const to = task.duration.to
        return (
          from <= today && to >= today
        )
      }
    )
    const todayTasksWithUser =
      await Promise.all(
        todayTasks.map(async (task) => {
          const executor =
            await ctx.db.get(
              task.executor
            )
          const supporter =
            task.supporter
              ? await ctx.db.get(
                  task.supporter
                )
              : undefined
          const initiator =
            task.initiator
              ? await ctx.db.get(
                  task.initiator
                )
              : undefined
          return {
            ...task,
            executor,
            supporter,
            initiator,
          }
        })
      )
    return todayTasksWithUser
  },
})
export const listSpacebyExecutor =
  query({
    args: { executorId: v.id('users') },
    handler: async (ctx, args) => {
      const identity =
        await ctx.auth.getUserIdentity()
      if (!identity) {
        throw new Error(
          'Not authenticated'
        )
      }
      const tasks = await ctx.db
        .query('tasks')
        .withIndex('by_executor', (q) =>
          q.eq(
            'executor',
            args.executorId
          )
        )
        .collect()
      // make workspaces list unique
      const workspaces = Array.from(
        new Set(
          tasks.map(
            (task) => task.workspace
          )
        )
      )
      const workspaceData =
        await Promise.all(
          workspaces.map(
            async (workspace) => {
              const workspaceData =
                await ctx.db.get(
                  workspace
                )
              return workspaceData
            }
          )
        )
      return workspaceData
    },
  })

export const listByExecutorSpace =
  query({
    args: {
      executorId: v.id('users'),
      workspaceId: v.id('workspace'),
    },
    handler: async (ctx, args) => {
      const identity =
        await ctx.auth.getUserIdentity()
      if (!identity) {
        throw new Error(
          'Not authenticated'
        )
      }
      const tasks = await ctx.db
        .query('tasks')
        .withIndex(
          'by_executor_workspace',
          (q) =>
            q
              .eq(
                'executor',
                args.executorId
              )
              .eq(
                'workspace',
                args.workspaceId
              )
        )
        .collect()
      return tasks
    },
  })

export const listByExcecutor = query({
  handler: async (ctx) => {
    const identity =
      await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error(
        'Not authenticated'
      )
    }
    const user = await ctx.db
      .query('users')
      .withIndex('by_convexId', (q) =>
        q.eq(
          'convexId',
          identity.subject
        )
      )
      .unique()
    if (!user) {
      throw new Error('User not found')
    }
    const tasks = await ctx.db
      .query('tasks')
      .withIndex('by_executor', (q) =>
        q.eq('executor', user._id)
      )
      .collect()
    const taskCounts = tasks.reduce(
      (counts, task) => {
        if (task.progress === 100) {
          counts.completedTasks += 1
        } else if (
          task.progress < 100
        ) {
          counts.inProgressTasks += 1
        }
        return counts
      },
      {
        completedTasks: 0,
        inProgressTasks: 0,
      }
    )

    const data = [
      {
        name: 'Complete',
        value:
          taskCounts.completedTasks,
      },
      {
        name: 'In Progress',
        value:
          taskCounts.inProgressTasks,
      },
    ]

    return data
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    duration: v.object({
      from: v.float64(),
      to: v.float64(),
    }),
    description: v.string(),
    taskGroup: v.string(),
    progress: v.number(),
    workspace: v.id('workspace'),
    executor: v.id('users'),
    supporter: v.optional(
      v.id('users')
    ),
  },
  handler: async (ctx, args) => {
    const identity =
      await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error(
        'Not authenticated'
      )
    }
    const workspace = await ctx.db.get(
      args.workspace
    )
    if (!workspace) {
      throw new Error('Not found')
    }

    const task = await ctx.db.insert(
      'tasks',
      {
        ...args,
      }
    )
    return task
  },
})

export const update = mutation({
  args: {
    id: v.id('tasks'),
    name: v.string(),
    duration: v.optional(
      v.object({
        from: v.float64(),
        to: v.float64(),
      })
    ),
    description: v.optional(v.string()),
    taskGroup: v.optional(v.string()),
    progress: v.optional(v.number()),
    workspace: v.optional(
      v.id('workspace')
    ),
    executor: v.optional(v.id('users')),
    supporter: v.optional(
      v.id('users')
    ),
  },
  handler: async (ctx, args) => {
    const identity =
      await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error(
        'Not authenticated'
      )
    }
    const { id, ...rest } = args
    const existingTask =
      await ctx.db.get(id)
    if (!existingTask) {
      throw new Error('Task not found')
    }
    const task = await ctx.db.patch(
      id,
      {
        ...rest,
      }
    )
    return task
  },
})

export const remove = mutation({
  args: { id: v.id('tasks') },
  handler: async (ctx, args) => {
    const identity =
      await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error(
        'Not authenticated'
      )
    }
    const existingTask =
      await ctx.db.get(args.id)
    if (!existingTask) {
      throw new Error('Not found')
    }
    const task = await ctx.db.delete(
      args.id
    )
    return task
  },
})

export const getTaskSummary = query({
  args: {
    workspaceId: v.id('workspace'),
  },
  handler: async (ctx, args) => {
    const identity =
      await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error(
        'Not authenticated'
      )
    }
    const workspace = await ctx.db.get(
      args.workspaceId
    )
    if (!workspace) {
      throw new Error('Not found')
    }
    const tasks = await ctx.db
      .query('tasks')
      .withIndex('by_workspace', (q) =>
        q.eq(
          'workspace',
          args.workspaceId
        )
      )
      .collect()
    const taskSummary = tasks.reduce(
      (
        summary: {
          [key: string]: {
            group: string
            total: number
            completed: number
            inProgress: number
          }
        },
        task
      ) => {
        if (!summary[task.taskGroup]) {
          summary[task.taskGroup] = {
            group: task.taskGroup,
            total: 0,
            completed: 0,
            inProgress: 0,
          }
        }

        summary[task.taskGroup].total +=
          1

        if (task.progress >= 99) {
          summary[
            task.taskGroup
          ].completed += 1
        } else {
          summary[
            task.taskGroup
          ].inProgress += 1
        }

        return summary
      },
      {}
    )

    const taskSummaryArray =
      Object.values(taskSummary)
    return taskSummaryArray
  },
})
