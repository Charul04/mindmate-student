import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Enhanced styles for vibrant, glowing buttons!
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", 
  {
    variants: {
      variant: {
        // Main button: gradient, subtle glow, playful scaling
        default: "bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 text-white shadow-lg shadow-pink-300/40 border border-pink-300/50 hover:scale-105 hover:shadow-xl hover:from-purple-600 hover:via-pink-600 hover:to-yellow-500 focus-visible:ring-yellow-300 active:scale-100",
        // Vibrant edge but more subtle background for secondary actions
        secondary: "bg-gradient-to-br from-sky-200 via-blue-300 to-fuchsia-200 text-indigo-800 font-semibold shadow-md shadow-fuchsia-200/40 border border-fuchsia-100 hover:scale-105 hover:bg-gradient-to-tr hover:from-sky-100 hover:to-fuchsia-300 focus-visible:ring-fuchsia-300 active:scale-100",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
