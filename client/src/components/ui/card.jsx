import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Card = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-3xl glass text-foreground",
      className
    )}
    {...props}
  />
));

Card.displayName = "Card";

const CardHeader = ({ className, ...props }) => (
  <div className={cn("p-6 pb-0", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-4 text-foreground", className)} {...props} />
);

export { Card, CardHeader, CardContent };

