import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Toast({ id, type = 'info', message, onClose, duration = 5000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />
  };

  const styles = {
    success: "bg-white border-green-100 ring-1 ring-green-50",
    error: "bg-white border-red-100 ring-1 ring-red-50",
    info: "bg-white border-blue-100 ring-1 ring-blue-50"
  };

  return (
    <div className={cn(
        "flex items-start gap-3 p-4 rounded-lg shadow-lg border w-full max-w-sm pointer-events-auto transition-all duration-300 animate-in slide-in-from-right-full",
        styles[type]
    )}>
      <div className="flex-shrink-0 mt-0.5">
        {icons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 leading-5">
            {message}
        </p>
      </div>
      <button 
        onClick={() => onClose(id)} 
        className="flex-shrink-0 ml-4 text-slate-400 hover:text-slate-600 rounded-md p-0.5 hover:bg-slate-100 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
