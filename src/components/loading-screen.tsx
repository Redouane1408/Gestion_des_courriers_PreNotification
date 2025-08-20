import { LoaderCircleIcon } from "lucide-react"

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoaderCircleIcon className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}
