import TaskColumn from "./TaskColumn"

const TaskBoard = () => {
  const todoTasks = [
    {
      id: 1,
      title: "Publish my first book",
      priority: "HIGH",
      description:
        "Write a blog post outlining the top 10 productivity tips for busy professionals. The post should be engaging, informative, and include actionable advice. Target word count: 1,200 words.",
      image:
        "https://plus.unsplash.com/premium_photo-1684331678124-ff62c82cef7a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Aug 26th 2024",
      time: "2:00pm",
    },
    {
      id: 2,
      title: "Home Renovation",
      priority: "MEDIUM",
      description: "Write a blog post outlining the top 10 producti",
      date: "Aug 26th 2024",
      time: "2:00pm",
    },
    {
      id: 3,
      title: "Organize a charity event",
      priority: "HIGH",
      date: "Aug 26th 2024",
      time: "2:00pm",
    },
    {
      id: 4,
      title: "Organize a charity event",
      priority: "HIGH",
      date: "Aug 26th 2024",
      time: "2:00pm",
    },
  ]

  const inProgressTasks = [
    {
      id: 1,
      title: "Watch a Frontend Tutorial",
      priority: "LOW",
      date: "Aug 26th 2024",
      time: "2:00pm",
    },
    {
      id: 2,
      title: "Prep my week meal",
      priority: "MEDIUM",
      image:
        "https://plus.unsplash.com/premium_photo-1684331678124-ff62c82cef7a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Aug 26th 2024",
      time: "2:00pm",
    },
  ]

  const completedTasks = [
    {
      id: 1,
      title: "Read a book",
      priority: "MEDIUM",
      image:
        "https://plus.unsplash.com/premium_photo-1684331678124-ff62c82cef7a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "Aug 26th 2024",
      time: "2:00pm",
    },
    {
      id: 2,
      title: "Improve cards readability",
      priority: "LOW",
      description: "As a team license owner, I want to use multiplied limits",
      date: "Aug 26th 2024",
      time: "2:00pm",
    },
    {
      id: 3,
      title: "Attend Standup and give updates",
      priority: "HIGH",
      date: "Aug 26th 2024",
      time: "2:00pm",
    },
  ]

  return (
    <div className="flex md:grid md:grid-cols-3 gap-4 p-6 h-full overflow-x-scroll">
      <TaskColumn title="To do" count={todoTasks.length} tasks={todoTasks} />
      <TaskColumn title="In progress" count={inProgressTasks.length} tasks={inProgressTasks} />
      <TaskColumn title="Completed" tasks={completedTasks} />
    </div>
  )
}

export default TaskBoard

