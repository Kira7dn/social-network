import * as z from 'zod'
import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  useMutation,
  useQuery,
} from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useForm } from 'react-hook-form'
import { TaskValidation } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import {
  CalendarIcon,
  GaugeCircle,
  Save,
  User2,
} from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useParams } from 'next/navigation'
import { Id } from '@/convex/_generated/dataModel'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Avatar,
  AvatarImage,
} from '@/components/ui/avatar'
import { toast } from 'sonner'
import { MergedTaskItem } from './Schedule'

export function TaskSheet({
  item,
  title,
  children,
}: {
  item?: MergedTaskItem
  title?: string
  children: React.ReactNode
}) {
  const updateTask = useMutation(
    api.tasks.update
  )
  const createTask = useMutation(
    api.tasks.create
  )
  const params = useParams()
  const members = useQuery(
    api.spacemember.list,
    {
      workspaceId:
        params.workspaceId as Id<'workspace'>,
    }
  )
  const taskGroup:
    | string[]
    | undefined = members?.reduce(
    (acc: string[], member) => {
      if (member?.workOn) {
        if (
          !acc.includes(member.workOn)
        ) {
          acc.push(member.workOn)
        }
      }
      return acc
    },
    []
  )

  const form = useForm<
    z.infer<typeof TaskValidation>
  >({
    resolver: zodResolver(
      TaskValidation
    ),
    defaultValues: {
      name: item?.name || 'New space',
      description:
        item?.description ||
        'Description of New space',
      duration: {
        from: item?.start_time
          ? new Date(item?.start_time)
          : new Date(),
        to: item?.end_time
          ? new Date(item?.end_time)
          : new Date(),
      },
      taskGroup:
        item?.taskGroup || 'Common',
      progress: [item?.progress || 0],
      executor: item?.executor?._id,
      supporter: item?.supporter?._id,
    },
  })
  const onSubmit = (
    values: z.infer<
      typeof TaskValidation
    >
  ) => {
    const payload = {
      name: values.name,
      duration: {
        from: values.duration.from.getTime(),
        to: values.duration.to.getTime(),
      },
      description: values.description,
      taskGroup:
        values.taskGroup || 'Common',
      progress: values.progress[0],
      executor:
        values.executor as Id<'users'>,
      supporter:
        values.supporter as Id<'users'>,
    }
    const promise = item
      ? updateTask({
          id: item.id as Id<'tasks'>,
          ...payload,
        })
      : createTask({
          workspace:
            params.workspaceId as Id<'workspace'>,
          ...payload,
        })
    toast.promise(promise, {
      loading:
        'Creating or Updating task...',
      success:
        'Task created/updated successfully!',
      error:
        'Failed to create/update task',
    })
  }
  return (
    <Sheet>
      <SheetTrigger>
        {children}
      </SheetTrigger>
      <SheetContent className="h-full pb-0 pr-4 sm:max-w-xl">
        <SheetHeader className="mr-4 flex flex-row items-center justify-between">
          <SheetTitle className="text-large-semibold">
            {title
              ? title
              : 'Edit Task'}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full w-full pb-8 pr-4 ">
          <Form {...form}>
            <form
              className="flex flex-col justify-start gap-4 px-2"
              onSubmit={form.handleSubmit(
                onSubmit
              )}
            >
              <Button
                type="submit"
                variant="ghost"
                disabled={
                  item &&
                  !form.formState
                    .isDirty
                }
                className="text-secondary transition-all duration-300 ease-in-out hover:text-primary"
              >
                <Save />
              </Button>
              <div className="text-sm flex flex-row items-start space-x-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({
                    field,
                  }) => (
                    <FormItem className="w-3/5">
                      <FormLabel>
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="bg-transparent focus-visible:ring-2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="taskGroup"
                  render={({
                    field,
                  }) => (
                    <FormItem className="w-2/5">
                      <FormLabel>
                        Task Group
                      </FormLabel>
                      <Select
                        onValueChange={
                          field.onChange
                        }
                        defaultValue={
                          field.value
                        }
                      >
                        <FormControl>
                          {(field.value &&
                            taskGroup?.includes(
                              field.value
                            )) ||
                          field.value ===
                            '' ? (
                            <SelectTrigger>
                              <SelectValue placeholder="Select Executor" />
                            </SelectTrigger>
                          ) : (
                            <Input
                              type="text"
                              className="bg-transparent"
                              {...field}
                            />
                          )}
                        </FormControl>
                        <SelectContent>
                          {taskGroup &&
                            taskGroup?.map(
                              (
                                group
                              ) => {
                                if (
                                  group
                                )
                                  return (
                                    <SelectItem
                                      key={
                                        group
                                      }
                                      value={
                                        group
                                      }
                                    >
                                      {
                                        group
                                      }
                                    </SelectItem>
                                  )
                              }
                            )}
                          <SelectItem
                            key="other"
                            value="Other"
                          >
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="progress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Progress
                    </FormLabel>
                    <div className="flex flex-row gap-4">
                      <FormControl>
                        <Button
                          id="progress"
                          variant={
                            'ghost'
                          }
                          disabled
                          className={cn(
                            'w-24 justify-start text-left font-normal',
                            !field.value &&
                              'text-muted-foreground'
                          )}
                        >
                          <GaugeCircle className="mr-2 h-4 w-4" />
                          {field.value +
                            '%'}
                        </Button>
                      </FormControl>

                      <Slider
                        defaultValue={
                          field.value
                        }
                        max={100}
                        step={1}
                        className={cn(
                          'w-[60%]'
                        )}
                        value={
                          field.value
                        }
                        onValueChange={
                          field.onChange
                        }
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="finished"
                          checked={
                            field
                              .value[0] >
                            99
                          }
                          onCheckedChange={() =>
                            field.onChange(
                              [100]
                            )
                          }
                        />
                        <label
                          htmlFor="finished"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Done
                        </label>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row items-start space-x-4">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({
                    field,
                  }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Duration
                      </FormLabel>
                      <div className="flex w-full flex-col items-center">
                        <Button
                          id="date"
                          variant={
                            'ghost'
                          }
                          disabled
                          className={cn(
                            'h-fit p-0 text-center text-base-medium',
                            !field.value &&
                              'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value &&
                          field.value
                            .from ? (
                            field.value
                              .to ? (
                              <>
                                {format(
                                  field
                                    .value
                                    .from,
                                  'LLL dd, y'
                                )}
                                -{' '}
                                {format(
                                  field
                                    .value
                                    .to,
                                  'LLL dd, y'
                                )}
                              </>
                            ) : (
                              <>
                                {format(
                                  field
                                    .value
                                    .from,
                                  'LLL dd, y'
                                )}
                                -{' '}
                                <span className="text-muted-foreground">
                                  Pick
                                  to
                                  date
                                </span>
                              </>
                            )
                          ) : (
                            <span>
                              Pick start
                              date
                            </span>
                          )}
                        </Button>
                        <Calendar
                          mode="range"
                          defaultMonth={
                            field.value
                              .from
                          }
                          selected={{
                            from: field
                              .value
                              .from,
                            to: field
                              .value.to,
                          }}
                          onSelect={
                            field.onChange
                          }
                          className="p-1"
                          classNames={{
                            month:
                              'space-y-1',
                            row: 'flex w-full mt-1',
                            day: cn(
                              buttonVariants(
                                {
                                  variant:
                                    'ghost',
                                }
                              ),
                              'h-5 w-9 p-0 font-normal aria-selected:opacity-100'
                            ),
                            cell: 'h-5 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-slate-800/50 dark:[&:has([aria-selected])]:bg-slate-800',
                          }}
                        />
                      </div>
                      <FormMessage>
                        {' '}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <div className="flex w-full flex-col gap-8">
                  <FormField
                    control={
                      form.control
                    }
                    name="executor"
                    render={({
                      field,
                    }) => (
                      <FormItem>
                        <FormLabel>
                          Executor
                        </FormLabel>
                        <Select
                          onValueChange={
                            field.onChange
                          }
                          defaultValue={
                            field.value
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Executor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {members &&
                              members
                                ?.filter(
                                  (
                                    member
                                  ) =>
                                    member
                                      ?.user
                                      .fullname !==
                                    form.getValues()
                                      .supporter
                                )
                                .map(
                                  (
                                    member
                                  ) => {
                                    if (
                                      member
                                    )
                                      return (
                                        <SelectItem
                                          key={
                                            member
                                              .user
                                              ._id
                                          }
                                          value={
                                            member
                                              .user
                                              ._id
                                          }
                                        >
                                          <div className="flex items-center justify-start gap-3">
                                            <Avatar className="h-6 w-6 ">
                                              <AvatarImage
                                                src={
                                                  member
                                                    .user
                                                    .imageUrl
                                                }
                                                alt={
                                                  member
                                                    .user
                                                    ._id
                                                }
                                              />
                                            </Avatar>
                                            {
                                              member
                                                .user
                                                .fullname
                                            }
                                          </div>
                                        </SelectItem>
                                      )
                                  }
                                )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={
                      form.control
                    }
                    name="supporter"
                    render={({
                      field,
                    }) => (
                      <FormItem>
                        <FormLabel>
                          Supporter
                        </FormLabel>
                        <Select
                          onValueChange={
                            field.onChange
                          }
                          defaultValue={
                            field.value
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Supporter" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {members &&
                              members
                                ?.filter(
                                  (
                                    member
                                  ) =>
                                    member
                                      ?.user
                                      .fullname !==
                                    form.getValues()
                                      .executor
                                )
                                .map(
                                  (
                                    member
                                  ) => {
                                    if (
                                      member
                                    )
                                      return (
                                        <SelectItem
                                          key={
                                            member
                                              .user
                                              ._id
                                          }
                                          value={
                                            member
                                              .user
                                              ._id
                                          }
                                        >
                                          <div className="flex items-center justify-start gap-3">
                                            <Avatar className="h-6 w-6 ">
                                              <AvatarImage
                                                src={
                                                  member
                                                    .user
                                                    .imageUrl
                                                }
                                                alt={
                                                  member
                                                    .user
                                                    .fullname
                                                }
                                              />
                                            </Avatar>
                                            {
                                              member
                                                .user
                                                .fullname
                                            }
                                          </div>
                                        </SelectItem>
                                      )
                                  }
                                )}
                            <SelectItem
                              key="remove"
                              value=""
                            ></SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
