import React from "react"

type CardProps = {
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className='p-5 w-4/5 bg-white rounded-md border border-solid border-zinc-200 text-center'>
      {children}
    </div>
  )
}
