import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          {
            "bg-brand-red text-white hover:bg-brand-red/90 shadow": variant === "default",
            "bg-red-600 text-white hover:bg-red-700 shadow-sm": variant === "destructive",
            "border border-border bg-white text-brand-dark hover:bg-neutral-100": variant === "outline",
            "bg-neutral-100 text-brand-dark hover:bg-neutral-200": variant === "secondary",
            "hover:bg-neutral-100 text-brand-dark hover:text-brand-red": variant === "ghost",
            "text-brand-red underline-offset-4 hover:underline": variant === "link",
          },
          {
            "h-9 px-4 py-2": size === "default",
            "h-8 rounded-md px-3 text-xs": size === "sm",
            "h-10 rounded-md px-8": size === "lg",
            "h-9 w-9": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export default Button
