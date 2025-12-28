export const KanbanColumn = ({ title, tasks }) => (
  <div className="w-80 flex-shrink-0 bg-gray-50/50 p-4 rounded-3xl flex flex-col gap-4">
    <div className="flex justify-between items-center px-2">
      <h3 className="font-bold text-gray-900">{title}</h3>
      <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-lg">{tasks.length}</span>
    </div>
    <div className="flex flex-col gap-3">
      {tasks.map(task => <TaskCard key={task.id} task={task} />)}
    </div>
    <button className="text-gray-400 hover:text-[#633BBC] text-sm font-medium py-2 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#633BBC]/30 transition-all">
      + Ajouter une tâche
    </button>
  </div>
);