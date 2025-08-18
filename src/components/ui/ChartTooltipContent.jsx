import React from 'react';
import { cn } from '../../utils/cn';

const ChartTooltipContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-background p-2 shadow-sm", className)}
    {...props}
  >
    {children}
  </div>
));
ChartTooltipContent.displayName = "ChartTooltipContent";

export default ChartTooltipContent;
