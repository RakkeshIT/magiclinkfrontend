import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-5 animate-spin", className)}
      {...props}
    />
  )
}

export function SpinnerCustom({className}: {className?: string}) {
  return (
    <div className={cn("flex items-center gap-4 z-50", className)}>
      <Spinner className="text-black" />
    </div>
  )
}
