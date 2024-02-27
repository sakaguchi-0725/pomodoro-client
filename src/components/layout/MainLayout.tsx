import React from "react"
import { Header } from "../common/Header"

type LayoutProps = {
  children: React.ReactNode
}

export const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="bg-zinc-50 h-screen">
        <div className="flex flex-col items-center mx-auto px-4 max-w-screen-md pt-2">
          {children}
        </div>
      </main>
    </>
  )
}
