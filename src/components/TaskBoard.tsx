import { DndContext, type DragEndEvent, type DragOverEvent, DragOverlay, closestCorners } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import React from "react"
import { TaskContextUse } from "../context/TaskContext"
import TaskCard from "./TaskCard"
import TaskColumn from "./TaskColumn"

const TaskBoard: React.FC = () => {
  const { tasks, moveTask, reorderTasks } = TaskContextUse()
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeTask = tasks.find((t) => t.id === active.id)
    const overTask = tasks.find((t) => t.id === over.id)

    if (!activeTask) return

    if (over.id.toString().includes("column-")) {
      // Dragging over a column
      const newStatus = over.id.toString().split("-")[1] as "TODO" | "IN_PROGRESS" | "COMPLETED"
      if (activeTask.status !== newStatus) {
        moveTask(active.id as string, newStatus)
      }
    } else if (overTask && activeTask.status !== overTask.status) {
      // Dragging over a task in a different column
      moveTask(active.id as string, overTask.status)
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      const activeIndex = tasks.findIndex((t) => t.id === active.id)
      const overIndex = tasks.findIndex((t) => t.id === over.id)

      if (tasks[activeIndex].status === tasks[overIndex].status) {
        // Reordering within the same column
        reorderTasks(arrayMove(tasks, activeIndex, overIndex))
      }
    }

    setActiveId(null)
  }

  const onDragStart = (event: DragEndEvent) => {
    setActiveId(event.active.id as string)
  }

  return (
    <DndContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      collisionDetection={closestCorners}
    >
      <div className="flex md:grid md:grid-cols-3 gap-4 p-6 h-full overflow-x-auto">
        <TaskColumn title="To do" status="TODO" />
        <TaskColumn title="In progress" status="IN_PROGRESS" />
        <TaskColumn title="Completed" status="COMPLETED" />
      </div>
      <DragOverlay>{activeId ? <TaskCard task={tasks.find((task) => task.id === activeId)!} /> : null}</DragOverlay>
    </DndContext>
  )
}

export default TaskBoard

