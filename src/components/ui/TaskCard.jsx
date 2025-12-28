export const TaskCard = ({ task }) => {
  const priorities = {
    high: "bg-red-100 text-red-700",
    medium: "bg-orange-100 text-orange-700",
    low: "bg-green-100 text-green-700"
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${priorities[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      <h4 className="text-sm font-bold text-gray-900 mb-2">{task.title}</h4>
      <p className="text-xs text-gray-500 line-clamp-2 mb-4">{task.description}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
           {/* Avatar du membre assigné */}
          <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold">
            {task.assignee?.name.charAt(0)}
          </div>
        </div>
        <span className="text-[10px] text-gray-400 font-medium">{task.deadline}</span>
      </div>
    </div>
  );
};