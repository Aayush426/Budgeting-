import React from "react"
import { cn } from "@/lib/utils"
import bunnyMascot from "@/assets/bunny-mascot.png"
import bearMascot from "@/assets/bear-mascot.png"
import foxMascot from "@/assets/fox-mascot.png"
import catMascot from "@/assets/cat-mascot.png"

interface MascotDisplayProps {
  type: "bunny" | "bear" | "fox" | "cat"
  size?: "sm" | "md" | "lg" | "xl"
  animate?: boolean
  className?: string
}

const mascotImages = {
  bunny: bunnyMascot,
  bear: bearMascot,
  fox: foxMascot,
  cat: catMascot
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16", 
  lg: "w-24 h-24",
  xl: "w-32 h-32"
}

export function MascotDisplay({ 
  type, 
  size = "md", 
  animate = true, 
  className 
}: MascotDisplayProps) {
  return (
    <div className={cn(
      "flex items-center justify-center",
      animate && "animate-float hover:animate-bounce-cute",
      className
    )}>
      <img
        src={mascotImages[type]}
        alt={`${type} mascot`}
        className={cn(
          "object-contain transition-transform duration-300 hover:scale-110",
          sizeClasses[size]
        )}
      />
    </div>
  )
}