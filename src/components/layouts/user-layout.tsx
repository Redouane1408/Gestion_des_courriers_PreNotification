import { Outlet } from "react-router-dom"
import { Sidebar } from "@/components/layouts/sidebar"
import { Header } from "@/components/layouts/header"

export function UserLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 md:ml-72">
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}