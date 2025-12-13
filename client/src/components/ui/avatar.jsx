import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

const Avatar = ({ className, ...props }) => (
  <AvatarPrimitive.Root
    className={cn(
      "relative flex h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border bg-muted",
      className
    )}
    {...props}
  />
);

const AvatarImage = ({ className, ...props }) => (
  <AvatarPrimitive.Image
    className={cn("h-full w-full object-cover", className)}
    {...props}
  />
);

const AvatarFallback = ({ className, ...props }) => (
  <AvatarPrimitive.Fallback
    className={cn(
      "flex h-full w-full items-center justify-center bg-muted text-sm font-semibold text-muted-foreground",
      className
    )}
    {...props}
  />
);

export { Avatar, AvatarImage, AvatarFallback };

