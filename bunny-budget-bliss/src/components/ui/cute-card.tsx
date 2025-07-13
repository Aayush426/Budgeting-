import * as React from "react"
import { cn } from "@/lib/utils"

const CuteCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "gradient" | "soft" | "glow"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-card border border-border shadow-soft",
    gradient: "bg-gradient-card border border-primary-light shadow-card",
    soft: "bg-muted/50 border border-muted shadow-sm",
    glow: "bg-card border border-primary-light shadow-glow"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg text-card-foreground transition-all duration-300",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
CuteCard.displayName = "CuteCard"

const CuteCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CuteCardHeader.displayName = "CuteCardHeader"

const CuteCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-foreground",
      className
    )}
    {...props}
  />
))
CuteCardTitle.displayName = "CuteCardTitle"

const CuteCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CuteCardDescription.displayName = "CuteCardDescription"

const CuteCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CuteCardContent.displayName = "CuteCardContent"

const CuteCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CuteCardFooter.displayName = "CuteCardFooter"

export {
  CuteCard,
  CuteCardHeader,
  CuteCardFooter,
  CuteCardTitle,
  CuteCardDescription,
  CuteCardContent,
}