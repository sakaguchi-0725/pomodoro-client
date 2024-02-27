import { FC, memo, Fragment, SetStateAction } from "react";
import { Task } from "../../../../../types";
import useStore from "../../../../../store/task";
import { useMutateTask } from "../../../../../hooks/task/useMutateTask";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";

type TodoItemProps = {
  task: Omit<Task, 'created_at' | 'updated_at'>
  setOpen: React.Dispatch<SetStateAction<boolean>>
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const TodoItemMemo: FC<TodoItemProps> = ({
  task,
  setOpen,
}) => {
  const updateTask = useStore((state) => state.updateEditedTask)
  const { deleteTaskMutation } = useMutateTask()
  const handleEdit = (id: number) => {
    setOpen(true)
    updateTask({
      id: id,
      title: task.title
    })
  }
  return (
    <li className="flex justify-between items-center gap-x-6 py-4">
      <div>
        <p className="text-sm font-semibold leading-6 text-gray-900">{task.title}</p>
      </div>
        
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-white py-2">
            <EllipsisVerticalIcon className="w-6 text-gray-900" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleEdit(task.id)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm w-full text-left'
                    )}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => deleteTaskMutation.mutate(task.id)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm w-full text-left'
                    )}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  )
}

export const TaskItem = memo(TodoItemMemo)