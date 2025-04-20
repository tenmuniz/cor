import * as React from "react";
import { cn } from "@/lib/utils";

export interface NeuCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  variant?: "default" | "secondary" | "accent" | "muted";
  border?: boolean;
}

export function NeuCard({
  className,
  elevated = false,
  variant = "default",
  border = false,
  ...props
}: NeuCardProps) {
  const variantStyles = {
    default: "bg-gradient-to-br from-white/50 to-white/40 dark:from-gray-800/50 dark:to-gray-900/40",
    secondary: "bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10",
    accent: "bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10",
    muted: "bg-gradient-to-br from-muted/50 to-muted/40 dark:from-muted/20 dark:to-muted/10",
  };

  return (
    <div
      className={cn(
        "rounded-lg backdrop-blur-sm",
        variantStyles[variant],
        elevated
          ? "shadow-lg shadow-black/5 dark:shadow-black/10"
          : "shadow-sm shadow-black/5 dark:shadow-black/10",
        border && "border border-gray-200/30 dark:border-gray-700/30",
        className
      )}
      {...props}
    />
  );
}