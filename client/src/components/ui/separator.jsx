import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

const Separator = ({ className, orientation = "horizontal", ...props }) => (
  <SeparatorPrimitive.Root
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      className
    )}
    orientation={orientation}
    {...props}
  />
);

export { Separator };

