import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cuteButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        bunny: "bg-gradient-primary text-primary-foreground hover:shadow-glow border-2 border-primary-light",
        bear: "bg-bear text-white hover:shadow-soft border-2 border-orange-200",
        fox: "bg-fox text-white hover:shadow-soft border-2 border-orange-300",
        cat: "bg-cat text-white hover:shadow-soft border-2 border-purple-200",
        outline: "border-2 border-primary bg-background hover:bg-primary-glow text-primary",
        ghost: "hover:bg-primary-glow text-primary hover:text-primary-foreground",
        soft: "bg-muted hover:bg-primary-light text-muted-foreground hover:text-primary-foreground"
      },
      size: {
        default: "h-12 px-6 py-3 rounded-full",
        sm: "h-9 px-4 py-2 rounded-full text-xs",
        lg: "h-14 px-8 py-4 rounded-full text-base",
        icon: "h-12 w-12 rounded-full"
      }
    },
    defaultVariants: {
      variant: "bunny",
      size: "default"
    }
  }
)

export interface CuteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cuteButtonVariants> {
  asChild?: boolean
}

const CuteButton = React.forwardRef<HTMLButtonElement, CuteButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(cuteButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
CuteButton.displayName = "CuteButton"

export { CuteButton, cuteButtonVariants }