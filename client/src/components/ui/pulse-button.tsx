import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const pulseButtonVariants = cva(
  "relative overflow-hidden rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-secondary",
        success:
          "bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-600",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent",
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

export interface PulseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pulseButtonVariants> {
  asChild?: boolean;
  pulseColor?: string;
}

const PulseButton = forwardRef<HTMLButtonElement, PulseButtonProps>(
  ({ className, variant, size, pulseColor = "rgba(255, 255, 255, 0.5)", asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(pulseButtonVariants({ variant, size, className }), "group")}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {props.children}
        </span>
        <span
          className="absolute inset-0 h-full w-full transform scale-0 rounded-md opacity-0 transition-all duration-300 group-hover:scale-[2.5] group-hover:opacity-100 group-active:opacity-0"
          style={{ background: `radial-gradient(circle, ${pulseColor} 0%, rgba(255, 255, 255, 0) 70%)` }}
        />
      </button>
    );
  }
);

PulseButton.displayName = "PulseButton";

export { PulseButton, pulseButtonVariants };