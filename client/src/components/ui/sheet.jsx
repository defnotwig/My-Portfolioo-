import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

const sheetVariants = {
  right: "inset-y-0 right-0 h-full w-full max-w-sm border-l animate-slide-in-from-right",
  left: "inset-y-0 left-0 h-full w-full max-w-sm border-r animate-slide-in-from-left",
  top: "inset-x-0 top-0 h-auto border-b animate-slide-in-from-top",
  bottom: "inset-x-0 bottom-0 h-auto border-t animate-slide-in-from-bottom",
};

const SheetContent = ({ className, children, title, description, side = "right", ...props }) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay 
      className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm animate-fade-in" 
    />
    <DialogPrimitive.Content
      className={cn(
        "fixed z-[9999] bg-background shadow-2xl focus:outline-none overflow-hidden",
        sheetVariants[side],
        className
      )}
      {...props}
    >
      <SheetClose className="absolute right-4 top-4 rounded-full border border-gray-200 dark:border-gray-700 p-2 text-sm text-muted-foreground transition hover:text-foreground hover:bg-muted z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
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

