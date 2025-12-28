export const Input = ({ label, error, icon: Icon, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-semibold text-gray-700 ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#633BBC] transition-colors" size={18} />
        )}
        <input
          {...props}
          className={`
            w-full h-12 rounded-xl border outline-none transition-all shadow-sm
            ${Icon ? 'pl-11 pr-4' : 'px-4'}
            ${error 
              ? 'border-red-500 focus:ring-4 focus:ring-red-100' 
              : 'border-gray-200 focus:border-[#633BBC] focus:ring-4 focus:ring-[#633BBC]/10'
            }
          `}
        />
      </div>
      {error && <span className="text-xs text-red-500 ml-1 font-medium">{error}</span>}
    </div>
  );
};