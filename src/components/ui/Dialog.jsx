import React from 'react';
import { cn } from '@/utils/cn';
import { X } from 'lucide-react';
import { Button } from './index';

const Dialog = React.forwardRef(({ 
  className, 
  children, 
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
Dialog.displayName = "Dialog";

const DialogContent = React.forwardRef(({ 
  className, 
  children, 
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-lg shadow-xl",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef(({ 
  className, 
  children, 
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between p-6 border-b",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef(({ 
  className, 
  children, 
  ...props 
}, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-xl font-semibold",
      className
    )}
    {...props}
  >
    {children}
  </h2>
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef(({ 
  className, 
  children, 
  ...props 
}, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground",
      className
    )}
    {...props}
  >
    {children}
  </p>
));
DialogDescription.displayName = "DialogDescription";

const DialogClose = React.forwardRef(({ 
  className, 
  onClick,
  ...props 
}, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    size="sm"
    onClick={onClick}
    className={cn("h-8 w-8 p-0", className)}
    {...props}
  >
    <X className="w-4 h-4" />
  </Button>
));
DialogClose.displayName = "DialogClose";

const DialogBody = React.forwardRef(({ 
  className, 
  children, 
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      "p-6",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
DialogBody.displayName = "DialogBody";

const DialogFooter = React.forwardRef(({ 
  className, 
  children, 
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex justify-end gap-2 p-6 border-t",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
DialogFooter.displayName = "DialogFooter";

const DialogTrigger = React.forwardRef(({ 
  asChild = false,
  children, 
  ...props 
}, ref) => {
  if (asChild) {
    return React.cloneElement(children, {
      ref,
      ...props
    });
  }
  
  return (
    <div
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
DialogTrigger.displayName = "DialogTrigger";

export { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogClose, 
  DialogBody, 
  DialogFooter,
  DialogTrigger
};
