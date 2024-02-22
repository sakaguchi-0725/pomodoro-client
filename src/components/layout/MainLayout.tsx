import React from "react"
import { Header } from "../common/Header"

type LayoutProps = {
  children: React.ReactNode
}

export const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  )
}
