export const Button = ({ children, variant = 'primary', isLoading, ...props }) => {
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 shadow-[0.5px_0.5px_1px_rgba(0,0,0,0.25)]",
    secondary: "bg-white border border-gray-200 text-gray-900 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-gray-500 hover:bg-gray-100"
  };

  return (
    <button 
      className={`px-4 py-2 cursor-pointer rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${variants[variant]}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
};