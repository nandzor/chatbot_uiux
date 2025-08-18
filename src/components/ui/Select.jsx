import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

const Select = React.forwardRef(({ 
  children, 
  value, 
  onValueChange, 
  defaultValue,
  className,
  ...props 
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || defaultValue);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSelectedValue(value);
    onValueChange?.(value);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative">
      <SelectTrigger 
        ref={ref}
        onClick={() => setIsOpen(!isOpen)}
        className={className}
        {...props}
      >
        <SelectValue value={selectedValue} />
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectTrigger>
      
      {isOpen && (
        <SelectContent>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === SelectItem) {
              return React.cloneElement(child, {
                onClick: () => handleSelect(child.props.value),
                className: cn(
                  child.props.className,
                  "cursor-pointer"
                )
              });
            }
            return child;
          })}
        </SelectContent>
      )}
    </div>
  );
});

Select.displayName = "Select";

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
  </button>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef(({ value, placeholder = "Select option", ...props }, ref) => (
  <span ref={ref} className="text-left" {...props}>
    {value || placeholder}
  </span>
));
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute top-full z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md",
      className
    )}
    {...props}
  >
    <div className="p-1">
      {children}
    </div>
  </div>
));
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(({ className, value, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
