import React, { useState, useEffect } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { cn } from '../../lib/utils';
import { Calendar, MessageSquare, Paperclip, Tag } from 'lucide-react';
import { fetchTaskLabels } from '../../services/label';
import { formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';
import { fr } from 'date-fns/locale';

const PriorityBadge = ({ priority }) => {
  const colors = {
    low: "bg-blue-100 text-blue-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-red-100 text-red-700",
  };
  
  return (
    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", colors[priority] || colors.medium)}>
      {priority}
    </span>
  );
};

const DeadlineBadge = ({ deadline }) => {
  if (!deadline) return null;
  
  const date = new Date(deadline);
  const isOverdue = isPast(date) && !isToday(date);
  const isUrgent = isToday(date) || isTomorrow(date);
  
  return (
    <div className={cn(
      "flex items-center gap-1 text-xs px-2 py-0.5 rounded-full",
      isOverdue ? "bg-red-100 text-red-700" : isUrgent ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"
    )}>
      <Calendar className="h-3 w-3" />
      <span>{formatDistanceToNow(date, { addSuffix: true, locale: fr })}</span>
    </div>
  );
};

const AssigneeStack = ({ assignes, userId }) => {
  // Use assignes array if available, otherwise fallback to single userId
  const users = Array.isArray(assignes) ? assignes : (userId ? [{ id: userId }] : []);
  if (users.length === 0) return null;

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {users.slice(0, 3).map((u, i) => (
        <div 
          key={u.id || i}
          className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600"
          title={u.name || 'Unknown'}
        >
          {u.name ? u.name.charAt(0).toUpperCase() : '?'}
        </div>
      ))}
      {users.length > 3 && (
        <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-500">
          +{users.length - 3}
        </div>
      )}
    </div>
  );
};

export default function TaskCard({ task, index, onClick }) {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const loadLabels = async () => {
      try {
        const data = await fetchTaskLabels(task.id);
        setLabels(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        // Silently fail - labels are optional
        console.error('Failed to load task labels', error);
      }
    };
    loadLabels();
  }, [task.id, task]);

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(task)}
          className={cn(
            "p-3 bg-white rounded-md shadow-sm border border-slate-200 group hover:shadow-md transition-shadow mb-2 cursor-pointer",
            snapshot.isDragging && "shadow-lg rotate-1 opacity-90"
          )}
          style={provided.draggableProps.style}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-sm font-medium text-slate-900 group-hover:text-purple-600 transition-colors flex-1 pr-2">
                {task.titre}
            </h4>
          </div>
          
          {/* Labels */}
          {labels.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {labels.slice(0, 3).map((label) => (
                <span
                  key={label.id}
                  className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: label.couleur || '#64748b' }}
                >
                  <Tag className="h-2.5 w-2.5" />
                  {label.nom}
                </span>
              ))}
              {labels.length > 3 && (
                <span className="text-xs text-slate-400">+{labels.length - 3}</span>
              )}
            </div>
          )}

          {/* Deadline */}
          {task.deadline && (
            <div className="mb-2">
              <DeadlineBadge deadline={task.deadline} />
            </div>
          )}
          
          {/* Footer: Priority and Activity Indicators */}
          <div className="flex items-center justify-between gap-2 mt-2">
            <div className="flex items-center gap-2">
                <PriorityBadge priority={task.priorite || 'medium'} />
                <AssigneeStack assignes={task.assignes} userId={task.user_id} />
            </div>
            
            <div className="flex items-center gap-2 text-slate-400">
              {/* Comment count - placeholder for now */}
              {task.commentCount > 0 && (
                <div className="flex items-center gap-1 text-xs">
                  <MessageSquare className="h-3 w-3" />
                  <span>{task.commentCount}</span>
                </div>
              )}
              {/* Attachment count - placeholder for now */}
              {task.attachmentCount > 0 && (
                <div className="flex items-center gap-1 text-xs">
                  <Paperclip className="h-3 w-3" />
                  <span>{task.attachmentCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
