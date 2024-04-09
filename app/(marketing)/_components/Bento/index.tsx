import clsx from 'clsx'
import Bounded from '../Bounded'
import Image from 'next/image'

const Bento = (): JSX.Element => {
  return (
    <Bounded>
      <h2 className="text-balance text-center text-heading4-bold font-medium md:text-heading3-bold">
        Streamline your tasks with
      </h2>
      <em className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-heading3-bold not-italic text-transparent">
        Ease and Precision
      </em>

      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
        Our Task Control feature
        empowers you to create, assign,
        track, and manage tasks
        effortlessly. Stay on top of
        deadlines with notifications and
        prioritize your tasks for
        maximum productivity.
      </div>

      <div className="z-10 mt-16 grid max-w-4xl grid-rows-[auto_auto_auto] gap-8 md:grid-cols-3 md:gap-10">
        <div className="glass-container row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 p-4 md:col-span-1">
          <h3 className="text-2xl">
            Task Creation
          </h3>
          <div className="max-w-md text-balance text-slate-300">
            Create tasks and assign
          </div>
          <Image
            src={
              '/assets/Taskmember.png'
            }
            className="w-auto"
            alt="Taskmember"
            width={500}
            height={144}
          />
        </div>
        <div className="glass-container row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 p-4 md:col-span-2">
          <h3 className="text-2xl">
            Daily Task
          </h3>
          <div className="max-w-md text-balance text-slate-300">
            Set daily tasks, prioritize
            them, and receive reminders
            for each task.
          </div>
          <Image
            src={
              '/assets/DailyTask.png'
            }
            className="w-auto"
            alt="DailyTask"
            width={800}
            height={144}
          />
        </div>
        <div className="glass-container row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 p-4 md:col-span-2">
          <h3 className="text-2xl">
            Task Timeline
          </h3>
          <div className="max-w-md text-balance text-slate-300">
            View the timeline of tasks,
            track their progress
          </div>
          <Image
            src={
              '/assets/TaskDistribute.png'
            }
            className="w-auto"
            alt="TaskDistribute"
            width={800}
            height={144}
          />
        </div>
        <div className="glass-container row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 p-4 md:col-span-1">
          <h3 className="text-2xl">
            Task Progress
          </h3>
          <div className="max-w-md text-balance text-slate-300">
            Track the status
          </div>
          <Image
            src={
              '/assets/TaskProgress.png'
            }
            className="w-auto"
            alt="TaskProgress"
            width={500}
            height={144}
          />
        </div>
      </div>
    </Bounded>
  )
}

export default Bento
