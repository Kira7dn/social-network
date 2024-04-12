import { Id } from '@/convex/_generated/dataModel'

export interface User {
  _id: Id<'users'>
  _creationTime?: number
  email?: string
  fullname: string
  imageUrl?: string
  bio?: string
  onboarded?: boolean
  convexId?: string
}
export interface Message {
  _id: Id<'messages'>
  _creationTime: number
  body: string
  from: User | undefined
  to: User | undefined
  seen: boolean
}

export interface TaskSummary {
  group: string
  total: number
  completed: number
  inProgress: number
}

export interface Post {
  _id: Id<'posts'>
  _creationTime: number
  content: string
  parent?: Id<'posts'>
  image?: string
  user: User
}
