"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SheetContextProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextProps | null>(null)

export interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export const Sheet: React.FC<SheetProps> = ({
  open: customOpen,
  onOpenChange,
  children
}) => {
  const [open, setOpen] = React.useState(customOpen || false)

  React.useEffect(() => {
    if (customOpen !== undefined) {
      setOpen(customOpen)
    }
  }, [customOpen])

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (customOpen === undefined) {
        setOpen(newOpen)
      }
      if (onOpenChange) {
        onOpenChange(newOpen)
      }
    },
    [customOpen, onOpenChange]
  )

  return (
    <SheetContext.Provider value={{ open, setOpen: handleOpenChange }}>
      {children}
    </SheetContext.Provider>
  )
}

export interface SheetTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

export const SheetTrigger: React.FC<SheetTriggerProps> = ({ children }) => {
  const context = React.useContext(SheetContext)
  if (!context) throw new Error("SheetTrigger must be used within a Sheet component")

  return React.cloneElement(children as React.ReactElement<any>, {
    onClick: (e: React.MouseEvent) => {
      if ((children as React.ReactElement<any>).props.onClick) {
        (children as React.ReactElement<any>).props.onClick(e)
      }
      context.setOpen(true)
    }
  })
}

export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right"
}

export const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, side = "left", children, ...props }, ref) => {
    const context = React.useContext(SheetContext)
    if (!context) throw new Error("SheetContent must be used within a Sheet component")

    React.useEffect(() => {
      if (context.open) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "unset"
      }
      return () => {
        document.body.style.overflow = "unset"
      }
    }, [context.open])

    if (!context.open) return null

    return (
      <div className="fixed inset-0 z-50 flex">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 transition-opacity duration-300 animate-in fade-in"
          onClick={() => context.setOpen(false)}
        />
        {/* Panel */}
        <div
          ref={ref}
          className={cn(
            "fixed z-50 bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out flex flex-col h-full w-3/4 max-w-sm animate-in",
            {
              "left-0 top-0 border-r slide-in-from-left": side === "left",
              "right-0 top-0 border-l slide-in-from-right": side === "right",
              "top-0 left-0 w-full h-1/3 border-b slide-in-from-top": side === "top",
              "bottom-0 left-0 w-full h-1/3 border-t slide-in-from-bottom": side === "bottom"
            },
            className
          )}
          {...props}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => context.setOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-75 hover:opacity-100 transition-opacity focus:outline-none cursor-pointer"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
          {children}
        </div>
      </div>
    )
  }
)
SheetContent.displayName = "SheetContent"

export const SheetHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("flex flex-col space-y-2 text-left mb-4", className)} {...props} />

export const SheetTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => <h2 className={cn("text-lg font-semibold text-brand-dark", className)} {...props} />
