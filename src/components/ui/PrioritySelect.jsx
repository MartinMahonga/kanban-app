export const PrioritySelect = ({ value, onChange }) => {
  const options = [
    { id: 'low', label: 'basse', color: 'bg-green-500' },
    { id: 'medium', label: 'moyenne', color: 'bg-orange-500' },
    { id: 'high', label: 'haute', color: 'bg-red-500' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700 ml-1">Priorité</label>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`
              flex-1 flex cursor-pointer items-center justify-center gap-2 py-2 px-2 rounded-xl border-2 transition-all
              ${value === opt.id 
                ? 'border-[#633BBC] bg-[#633BBC]/5 text-gray-900' 
                : 'border-gray-100 text-gray-500 hover:border-gray-200'}
            `}
          >
            <div className={`w-2 h-2 rounded-full ${opt.color}`} />
            <span className="text-xs font-bold">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};