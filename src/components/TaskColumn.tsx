import { BsPlus } from "react-icons/bs"
import TaskCard from "./TaskCard"

interface Task {
  id: number
  title: string
  priority: string
  description?: string
  image?: string
  date: string
  time: string
}

interface TaskColumnProps {
  title: string
  count?: number
  tasks: Task[]
}

const TaskColumn = ({ title, count, tasks }: TaskColumnProps) => {
  return (
    <div className="bg-[#F5F7F9] shadow-sm rounded-lg p-4 flex flex-col overflow-scroll h-fit max-h-full min-w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium text-[#6F6F6F]">{title}</h3>
          {count && <span className="bg-[#DDDDDD] text-[#6F6F6F] px-2 py-0.5 rounded-[4px] text-sm">{count}</span>}
        </div>
        <button className="p-1 hover:bg-gray-200 rounded cursor-pointer transition-all duration-200 ease">
          <BsPlus className="w-6 h-6 text-[#6F6F6F]" />
        </button>
      </div>
      <div className="space-y-4 flex-1 py-4 overflow-y-scroll">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default TaskColumn

