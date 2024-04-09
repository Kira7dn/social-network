import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const taskMembers = await ctx.db
      .query("taskMembers")
      .withIndex("by_task", (q) =>
        q.eq("task", args.taskId)
      )
      .collect();
    if (!taskMembers) {
      throw new Error("Not found");
    }
    const membersData = await Promise.all(
      taskMembers.map(async (member) => {
        const user = await ctx.db.get(member.user);
        if (user) {
          return {
            ...member,
            user: user,
          };
        }
      })
    );
    return membersData;
  },
});

export const listWorkspacesAndTasksByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Query to get the tasks where the user is a member
    const userTasks = await ctx.db
      .query("taskMembers")
      .withIndex("by_user_role", (q) =>
        q.eq("user", args.userId).eq("role", "Executor")
      )
      .collect();

    // For each task, get the workspace information
    const tasksWithWorkspace = await Promise.all(
      userTasks.map(async (task) => {
        const taskInfo = await ctx.db.get(task.task);
        if (taskInfo) {
          return {
            ...task,
            workspace: taskInfo.workspace,
          };
        }
      })
    );

    // Group tasks by workspace
    const workspaces: {
      [key: string]: { id: string; tasks: any[] };
    } = tasksWithWorkspace.reduce(
      (acc, task) => {
        const workspaceId = task?.workspace;
        if (workspaceId && !acc[workspaceId]) {
          acc[workspaceId] = {
            id: workspaceId,
            tasks: [],
          };
        }
        if (workspaceId) {
          acc[workspaceId].tasks.push(task);
        }
        return acc;
      },
      {} as { [key: string]: { id: string; tasks: any[] } }
    );

    return Object.values(workspaces);
  },
});

export const create = mutation({
  args: {
    user: v.id("users"),
    task: v.id("tasks"),
    role: v.union(
      v.literal("Executor"),
      v.literal("Initiator"),
      v.literal("Supporter ")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const task = await ctx.db.get(args.task);
    if (!task) {
      throw new Error("Not found");
    }
    const taskMember = await ctx.db.insert("taskMembers", {
      ...args,
    });
    return taskMember;
  },
});

export const update = mutation({
  args: {
    id: v.id("taskMembers"),
    role: v.optional(
      v.union(
        v.literal("Executor"),
        v.literal("Initiator"),
        v.literal("Supporter ")
      )
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const { id, ...rest } = args;
    const existingTaskMember = await ctx.db.get(id);
    if (!existingTaskMember) {
      throw new Error("Task not found");
    }
    const taskMember = await ctx.db.patch(id, {
      ...rest,
    });
    return taskMember;
  },
});

export const remove = mutation({
  args: { id: v.id("taskMembers") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const existingTaskMember = await ctx.db.get(args.id);
    if (!existingTaskMember) {
      throw new Error("Not found");
    }
    const taskMember = await ctx.db.delete(args.id);
    return taskMember;
  },
});
