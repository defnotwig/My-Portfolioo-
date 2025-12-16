import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

const SheetContent = ({ className, children, title, description, ...props }) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm z-50" />
    <DialogPrimitive.Content
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-border bg-background dark:bg-card px-6 py-6 shadow-2xl focus:outline-none",
        className
      )}
      {...props}
    >
      <SheetClose className="absolute right-6 top-6 rounded-full border border-border p-2 text-sm text-muted-foreground transition hover:text-foreground hover:bg-muted">
        <X className="h-4 w-4" />
      </SheetClose>
      {title && (
        <DialogPrimitive.Title className="sr-only">
          {title}
        </DialogPrimitive.Title>
      )}
      {description && (
        <DialogPrimitive.Description className="sr-only">
          {description}
        </DialogPrimitive.Description>
      )}
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

export { Sheet, SheetTrigger, SheetContent, SheetClose };

