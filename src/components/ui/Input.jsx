import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ label, className, type, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-slate-700 ml-1">{label}</label>
      <input
        type={type}
        className={cn(
          "w-full h-12 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#633BBC] focus:ring-2 focus:ring-[#633BBC]/20 transition-all shadow-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";

export { Input };
