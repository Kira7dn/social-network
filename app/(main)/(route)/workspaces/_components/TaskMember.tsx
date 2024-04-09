import React from 'react'

import { useParams } from 'next/navigation'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import {
  Avatar,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

export interface TaskMemberProps {
  name: string
  role: string
  workOn: string
  imgSrc: string
}

const MemberDetail: React.FC<
  TaskMemberProps
> = ({
  name,
  role,
  workOn,
  imgSrc,
}) => (
  <TableRow className="duration-50 transition-opacity ease-in">
    <TableCell className="w-8 p-0">
      <Avatar className="h-6 w-6 ">
        <AvatarImage
          src={imgSrc}
          alt={name}
        />
      </Avatar>
    </TableCell>
    <TableCell className="w-40 p-0">
      <p className="text-small-regular text-card-foreground">
        {name}
      </p>
      <p className="text-tiny-medium text-secondary">
        {role}
      </p>
    </TableCell>
    <TableCell className="w-20 p-0">
      <span className="truncate text-small-regular">
        {workOn}
      </span>
    </TableCell>
  </TableRow>
)

const TaskMember = () => {
  const params = useParams()
  const membersData = useQuery(
    api.spacemember.list,
    {
      workspaceId:
        params.workspaceId as Id<'workspace'>,
    }
  )
  if (!membersData)
    return (
      <Table className="scrollbar-hide overflow-y-auto text-card-foreground">
        <TableHeader>
          <TableHead className="h-4 p-0"></TableHead>
          <TableHead className="h-4 p-0 text-base-semibold text-card-foreground">
            Fullname
          </TableHead>
          <TableHead className="h-4 p-0 text-base-semibold text-card-foreground">
            Work On
          </TableHead>
        </TableHeader>
        <TableBody>
          {[...Array(3)].map(
            (_, index) => (
              <TableRow key={index}>
                <TableCell className="h-10 w-8 p-0">
                  <Skeleton className="h-6 w-6 rounded-full" />
                </TableCell>
                <TableCell className="w-40 p-0">
                  <Skeleton className="h-4 p-1" />
                </TableCell>
                <TableCell className="w-20 p-0">
                  <Skeleton className="h-4 w-14 p-1" />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="h-4 p-0"></TableHead>
          <TableHead className="h-4 p-0 text-base-semibold text-card-foreground">
            Fullname
          </TableHead>
          <TableHead className="h-4 p-0 text-base-semibold text-card-foreground">
            Work On
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {membersData.map(
          (member, index) => {
            if (member) {
              return (
                <MemberDetail
                  key={index}
                  name={
                    member.user.fullname
                  }
                  role={
                    member.role ||
                    'Member'
                  }
                  workOn={
                    member.workOn ||
                    'Workspace'
                  }
                  imgSrc={
                    member.user
                      .imageUrl ||
                    '/images/avatar.png'
                  }
                />
              )
            }
          }
        )}
      </TableBody>
    </Table>
  )
}

export default TaskMember
