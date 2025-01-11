import { forwardRef } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils/cn";
import { DrawerOverlay } from "@/components/drawer/drawer-overlay";

export const DrawerContent = forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPrimitive.Portal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPrimitive.Portal>
));

DrawerContent.displayName = "DrawerContent";
