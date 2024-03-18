import { useQueryTasks } from "../../../../hooks/task/useQueryTasks"
import { useRef, useState } from "react"
import { TaskItem } from "./components/TodoItem"
import { Card } from "../../../common/Card"
import { Modal } from "../../../common/Modal"
import { TodoModal } from "./components/TodoModal"
import useStore from "../../../../store/task"

export const Todo = () => {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const resetEditedTask = useStore((state) => state.resetEditedTask)
  const { data, isLoading } = useQueryTasks()

  return (
    <>
      <Card>
        <button
          className="border w-full h-12 rounded mb-2 border-slate-300 bg-slate-100 font-semibold text-slate-600 hover:bg-slate-200"
          onClick={() => setOpen(true)}
        >
          Add Todo
        </button>
        {isLoading ? (
          <p>Loading..</p>
        ) : (
          <ul role="list" className="divide-y divide-gray-100">
            {data?.map((task) => (
              <TaskItem key={task.id} task={task} setOpen={setOpen} />
            ))}
          </ul>
        )}
      </Card>
      <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef} resetModal={resetEditedTask}>
        <TodoModal setOpen={setOpen} cancelButtonRef={cancelButtonRef} />
      </Modal>
    </>
  )
}
