'use client'

import {
  useMutation,
  useQuery,
} from 'convex/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMembers } from '@/hooks/use-members'
import { motion } from 'framer-motion'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../ui/avatar'
import { useRef, useState } from 'react'
import { User } from '@/lib/type'
import { Skeleton } from '../ui/skeleton'
import {
  ArrowRightCircleIcon,
  DeleteIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'

export const MemberModal = () => {
  const memberModal = useMembers()
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  return (
    <Dialog
      open={memberModal.isOpen}
      onOpenChange={memberModal.onClose}
    >
      <DialogContent className="md:h-[600px] md:max-w-[900px]">
        <DialogHeader>
          <h2 className="text-center text-heading4-bold">
            Member List
          </h2>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            className="py-4"
          >
            {memberModal.workspaceId && (
              <MembersContent
                workspaceId={
                  memberModal.workspaceId
                }
              />
            )}
          </motion.div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
type MemberProps = {
  member: {
    _id: Id<'members'>
    user: User
    workspace: Id<'workspace'>
    role?: string
    workOn?: string
  }
}
const MembersContent = ({
  workspaceId,
}: {
  workspaceId: Id<'workspace'>
}) => {
  const data = useQuery(
    api.spacemember.listSet,
    {
      workspaceId:
        workspaceId as Id<'workspace'>,
    }
  )
  const addmember = useMutation(
    api.spacemember.create
  )
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }
  if (!data)
    return (
      <div className="flex flex-col gap-2 rounded-lg bg-card p-3 shadow-sm">
        <p className="text-large-bold ">
          Contacts
        </p>
        <div className="flex flex-col gap-2 overflow-y-auto py-2">
          {[...Array(5)].map(
            (_, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-2 hover:bg-lightGray"
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-[250px]" />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    )
  const { membersData, filteredUsers } =
    data
  return (
    <div className="grid h-full max-w-4xl grid-rows-[auto_auto_auto] gap-8 rounded-lg md:grid-cols-3 md:gap-10">
      <div className="row-span-2 grid grid-rows-subgrid gap-4 md:col-span-1">
        <p className="text-large-bold ">
          Contacts
        </p>
        <ScrollArea className="flex h-40 w-full flex-col gap-2 py-2 text-base-medium md:h-full">
          {filteredUsers.map((user) => {
            const {
              _id,
              fullname,
              imageUrl,
            } = user
            const handleAdd = () => {
              const promise = addmember(
                {
                  workspaceId:
                    workspaceId,
                  userId: _id,
                  role: 'Unknown',
                  workOn: 'Unknown',
                }
              )
              toast.promise(promise, {
                loading:
                  'Adding member...',
                success:
                  'Member added!',
                error:
                  'Failed to add member.',
              })
            }
            return (
              <motion.div
                className="my-2 flex items-center justify-between rounded-xl px-2"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={_id}
              >
                <div className="flex w-52 items-center gap-2">
                  <div>
                    <Avatar className="border-2 border-lightGray">
                      <AvatarImage
                        src={imageUrl}
                      />
                      <AvatarFallback>
                        {fullname}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="truncate">
                    {fullname}
                  </p>
                </div>

                <ArrowRightCircleIcon
                  className="cursor-pointer hover:text-primary"
                  onClick={handleAdd}
                  style={{
                    strokeWidth: 1.5,
                  }}
                />
              </motion.div>
            )
          })}
        </ScrollArea>
      </div>
      <div className="row-span-2 grid grid-rows-subgrid gap-4 md:col-span-2">
        <p className="text-large-bold ">
          Workspace Members
        </p>
        <ScrollArea className="h-40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>
                  Fullname
                </TableHead>
                <TableHead className="text-right">
                  Role
                </TableHead>
                <TableHead className="text-right">
                  Work On
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {membersData.map(
                (member) => {
                  if (member) {
                    return (
                      <MemberData
                        key={member._id}
                        member={member}
                      />
                    )
                  }
                }
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}
const MemberData = ({
  member,
}: MemberProps) => {
  const roleRef =
    useRef<HTMLInputElement>(null)
  const workOnRef =
    useRef<HTMLInputElement>(null)
  const update = useMutation(
    api.spacemember.update
  )
  const [role, setRole] = useState(
    member.role
  )
  const [workOn, setWorkOn] = useState(
    member.workOn
  )
  const [
    isRoleEditing,
    setIsRoleEditing,
  ] = useState(false)
  const [
    isWorkEditing,
    setIsWorkEditing,
  ] = useState(false)
  const remove = useMutation(
    api.spacemember.remove
  )

  const enableInputRole = () => {
    setRole(member.role)
    setIsRoleEditing(true)
    setTimeout(() => {
      roleRef.current?.focus()
      roleRef.current?.setSelectionRange(
        0,
        roleRef.current.value.length
      )
    }, 0)
  }
  const onChangeRole = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRole(event.target.value)
  }

  const enableInputWorkOn = () => {
    setWorkOn(member.workOn)
    setIsWorkEditing(true)
    setTimeout(() => {
      workOnRef.current?.focus()
      workOnRef.current?.setSelectionRange(
        0,
        workOnRef.current.value.length
      )
    }, 0)
  }

  const onChangeWorkOn = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWorkOn(event.target.value)
  }

  const disableInput = () => {
    if (isRoleEditing) {
      update({
        id: member._id as Id<'members'>,
        role: role || 'Untitled',
      })
      setIsRoleEditing(false)
    }
    if (isWorkEditing) {
      update({
        id: member._id as Id<'members'>,
        workOn: workOn || 'Untitled',
      })
      setIsWorkEditing(false)
    }
  }
  const onKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      disableInput()
    }
  }
  const handleDelete = () => {
    const promise = remove({
      id: member._id,
    })
    toast.promise(promise, {
      loading: 'Removing member...',
      success: 'Member removed!',
      error: 'Failed to remove member.',
    })
  }

  return (
    <TableRow
      key={member._id}
      className=""
    >
      <TableCell className="w-8 p-1">
        <DeleteIcon
          className="cursor-pointer font-light hover:text-red-600"
          onClick={handleDelete}
          style={{ strokeWidth: 1.5 }}
        />
      </TableCell>
      <TableCell className="w-36 truncate p-1 text-start">
        {member.user.fullname}
      </TableCell>
      <TableCell className="w-32 truncate p-1 text-left">
        {isRoleEditing ? (
          <Input
            ref={roleRef}
            onClick={enableInputRole}
            onBlur={disableInput}
            onChange={onChangeRole}
            onKeyDown={onKeyDown}
            value={role}
            type="text"
            className="h-6 w-full bg-transparent p-0 text-right"
          />
        ) : (
          <div
            onClick={enableInputRole}
            className="h-6 w-full cursor-text items-center p-0 text-right"
          >
            <span className="truncate">
              {role}
            </span>
          </div>
        )}
      </TableCell>
      <TableCell className="w-32 truncate p-1 text-right">
        {isWorkEditing ? (
          <Input
            ref={workOnRef}
            onClick={enableInputWorkOn}
            onBlur={disableInput}
            onChange={onChangeWorkOn}
            onKeyDown={onKeyDown}
            value={workOn}
            type="text"
            className="h-6 w-full bg-transparent p-0 text-right"
          />
        ) : (
          <div
            onClick={enableInputWorkOn}
            className="h-6 w-full cursor-text items-center p-0"
          >
            <span className="truncate">
              {workOn}
            </span>
          </div>
        )}
      </TableCell>
    </TableRow>
  )
}
