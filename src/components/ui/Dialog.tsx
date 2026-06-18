"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DialogContextProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextProps | null>(null)

export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export const Dialog: React.FC<DialogProps> = ({
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
    <DialogContext.Provider value={{ open, setOpen: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

export interface DialogTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({ children }) => {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error("DialogTrigger must be used within a Dialog component")

  return React.cloneElement(children as React.ReactElement<any>, {
    onClick: (e: React.MouseEvent) => {
      if ((children as React.ReactElement<any>).props.onClick) {
        (children as React.ReactElement<any>).props.onClick(e)
      }
      context.setOpen(true)
    }
  })
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(DialogContext)
    if (!context) throw new Error("DialogContent must be used within a Dialog component")

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 transition-opacity duration-300 animate-in fade-in"
          onClick={() => context.setOpen(false)}
        />
        {/* Modal Panel */}
        <div
          ref={ref}
          className={cn(
            "relative w-full max-w-lg rounded-xl border border-border bg-white p-6 shadow-lg transition-all duration-300 ease-out z-50 animate-in zoom-in-95 flex flex-col max-h-[90vh] overflow-y-auto",
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
DialogContent.displayName = "DialogContent"

export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)} {...props} />

export const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => <h2 className={cn("text-lg font-semibold leading-none tracking-tight text-brand-dark", className)} {...props} />

export const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4", className)} {...props} />
