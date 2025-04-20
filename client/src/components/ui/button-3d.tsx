import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const button3dVariants = cva(
  "relative group inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-primary/80 to-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-md hover:shadow-primary/20 focus-visible:ring-primary",
        secondary:
          "bg-gradient-to-b from-secondary/80 to-secondary text-secondary-foreground shadow-lg shadow-secondary/30 hover:shadow-md hover:shadow-secondary/20 focus-visible:ring-secondary",
        success:
          "bg-gradient-to-b from-green-500/80 to-green-600 text-white shadow-lg shadow-green-600/30 hover:shadow-md hover:shadow-green-600/20 focus-visible:ring-green-600",
        destructive:
          "bg-gradient-to-b from-destructive/80 to-destructive text-destructive-foreground shadow-lg shadow-destructive/30 hover:shadow-md hover:shadow-destructive/20 focus-visible:ring-destructive",
        outline:
          "border border-input bg-gradient-to-b from-background to-background/80 hover:bg-accent hover:text-accent-foreground shadow-lg shadow-primary/10 hover:shadow-md hover:shadow-primary/5",
        ghost:
          "hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent",
        link: "text-primary underline-offset-4 hover:underline focus-visible:ring-primary",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface Button3dProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button3dVariants> {
  asChild?: boolean;
}

const Button3d = forwardRef<HTMLButtonElement, Button3dProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(button3dVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 transition-transform transform group-active:scale-95">
          {props.children}
        </span>
        <span className="absolute inset-0 rounded-md bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="absolute bottom-0 left-0 right-0 h-1 rounded-b-md bg-black/10" />
      </button>
    );
  }
);

Button3d.displayName = "Button3d";

export { Button3d, button3dVariants };