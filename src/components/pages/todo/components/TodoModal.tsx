import React, { SetStateAction } from 'react'
import useStore from '../../../../store/task'
import { useMutateTask } from "../../../../hooks/task/useMutateTask"

type TodoModalProps = {
  setOpen: React.Dispatch<SetStateAction<boolean>>
  cancelButtonRef: React.RefObject<HTMLButtonElement>
}

export const TodoModal: React.FC<TodoModalProps> = ({ setOpen, cancelButtonRef }) => {
  const { editedTask } = useStore()
  const updateTask = useStore((state) => state.updateEditedTask)
  const { createTaskMutation, updateTaskMutation } = useMutateTask()
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (editedTask.id === 0) {
      createTaskMutation.mutate({
        title: editedTask.title
      })
    } else {
      updateTaskMutation.mutate(editedTask)
    }

    setOpen(false)
  }

  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <label className='text-slate-500 text-md' htmlFor='title'>Title</label>
        <input
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Title"
            type="text"
            onChange={(e) => updateTask({ ...editedTask, title: e.target.value })}
            value={editedTask.title || ''}
        />
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
          onClick={(e) => handleClick(e)}
        >
          Store
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setOpen(false)}
          ref={cancelButtonRef}
        >
          Cancel
        </button>
      </div>
    </>
  )
}
