
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxCount?: number;
  showCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxCount, showCount, ...props }, ref) => {
    const [currentLength, setCurrentLength] = React.useState(
      props.value ? String(props.value).length : 0
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      
      // If maxCount is set, prevent typing beyond the limit
      if (maxCount && newValue.length > maxCount) {
        return;
      }
      
      setCurrentLength(newValue.length);
      
      // Call the original onChange handler if provided
      if (props.onChange) {
        props.onChange(e);
      }
    };

    // Update current length when value prop changes (controlled component)
    React.useEffect(() => {
      if (props.value !== undefined) {
        setCurrentLength(String(props.value).length);
      }
    }, [props.value]);

    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            showCount && "pb-6", // Add extra padding when showing count
            className
          )}
          ref={ref}
          {...props}
          onChange={handleChange}
        />
        {showCount && (
          <div className="absolute bottom-2 right-3 text-xs text-muted-foreground">
            {currentLength}{maxCount && `/${maxCount}`}
          </div>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
