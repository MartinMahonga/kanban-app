export const Textarea = ({ label, ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>}
    <textarea
      {...props}
      className="w-full min-h-[120px] p-4 rounded-2xl border border-gray-200 outline-none focus:border-[#633BBC] focus:ring-4 focus:ring-[#633BBC]/10 transition-all shadow-sm resize-none"
    />
  </div>
);