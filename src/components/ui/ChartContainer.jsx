import React from 'react';
import { cn } from '../../utils/cn';

const ChartContainer = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  >
    {children}
  </div>
));
ChartContainer.displayName = "ChartContainer";

export default ChartContainer;
