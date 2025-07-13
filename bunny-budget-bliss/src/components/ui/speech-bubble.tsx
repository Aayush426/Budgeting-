import * as React from "react"
import { cn } from "@/lib/utils"

interface SpeechBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "bunny" | "bear" | "fox" | "cat" | "default"
  position?: "left" | "right" | "center"
  animate?: boolean
}

const SpeechBubble = React.forwardRef<HTMLDivElement, SpeechBubbleProps>(
  ({ className, variant = "default", position = "left", animate = true, children, ...props }, ref) => {
    const variantClasses = {
      bunny: "bg-primary-glow border-primary text-primary-foreground",
      bear: "bg-orange-100 border-bear text-orange-900",
      fox: "bg-orange-50 border-fox text-orange-900", 
      cat: "bg-secondary-light border-cat text-secondary-foreground",
      default: "bg-muted border-border text-muted-foreground"
    }

    const positionClasses = {
      left: "before:left-4",
      right: "before:right-4", 
      center: "before:left-1/2 before:-translate-x-1/2"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-lg border-2 p-4 text-sm font-medium",
          "before:absolute before:-bottom-2 before:h-4 before:w-4 before:rotate-45 before:border-b-2 before:border-r-2 before:border-inherit before:bg-inherit",
          variantClasses[variant],
          positionClasses[position],
          animate && "animate-bounce-cute",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SpeechBubble.displayName = "SpeechBubble"

export { SpeechBubble }