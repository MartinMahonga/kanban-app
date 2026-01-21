import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { cn } from '../../lib/utils';
import { Plus } from 'lucide-react';

export default function Column({ id, title, tasks, onAddTask, onTaskClick }) {
  return (
    <div className="flex flex-col w-80 shrink-0">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">{title}</span>
            <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                {tasks.length}
            </span>
        </div>
        <button 
            onClick={onAddTask}
            className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded hover:bg-slate-100"
        >
            <Plus className="h-4 w-4" />
        </button>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex-1 bg-slate-50/50 rounded-lg p-2 transition-colors min-h-[150px]",
              snapshot.isDraggingOver && "bg-slate-100"
            )}
          >
            {tasks.map((task, index) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                index={index} 
                onClick={onTaskClick}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
