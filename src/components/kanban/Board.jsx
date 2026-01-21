import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import { updateTaskStatus } from "../../services/task";

export default function Board({
  projectId,
  tasks,
  onTaskUpdate,
  onAddTaskClick,
  onTaskClick,
}) {
  // Organize tasks by status
  const [columns, setColumns] = useState({
    todo: [],
    doing: [],
    done: [],
  });

  useEffect(() => {
    // Safety check to ensure tasks is an array before filtering
    const safeTasks = Array.isArray(tasks) ? tasks : [];

    const newColumns = {
      todo: safeTasks.filter((t) => t.status === "todo"),
      doing: safeTasks.filter((t) => t.status === "doing"),
      done: safeTasks.filter((t) => t.status === "done"),
    };
    setColumns(newColumns);
  }, [tasks]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumnId = source.droppableId;
    const finishColumnId = destination.droppableId;

    // Moving within same column
    if (startColumnId === finishColumnId) {
      const columnTasks = Array.from(columns[startColumnId]);
      const task = columnTasks.find((t) => String(t.id) === draggableId);
      const newTasks = columnTasks.filter((t) => String(t.id) !== draggableId);
      newTasks.splice(destination.index, 0, task);

      setColumns({
        ...columns,
        [startColumnId]: newTasks,
      });
      return;
    }

    // Moving to different column
    const startTasks = Array.from(columns[startColumnId]);
    const finishTasks = Array.from(
      columns[startColumnId] === finishColumnId
        ? startTasks
        : columns[finishColumnId],
    );

    // Find task
    const task = startTasks.find((t) => String(t.id) === draggableId);

    // Optimistic Update
    const newStartTasks = startTasks.filter(
      (t) => String(t.id) !== draggableId,
    );
    const newTask = { ...task, status: finishColumnId };
    const newFinishTasks = Array.from(columns[finishColumnId]);
    newFinishTasks.splice(destination.index, 0, newTask);

    setColumns({
      ...columns,
      [startColumnId]: newStartTasks,
      [finishColumnId]: newFinishTasks,
    });

    // Call API without triggering full reload/flash
    try {
      await updateTaskStatus(projectId, task.id, finishColumnId);
      // We do NOT call onTaskUpdate() here to preserve the local manual ordering.
      // The local optimistic update is sufficient for the session.
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-full gap-6 overflow-x-auto pb-4">
        <Column
          id="todo"
          title="To Do"
          tasks={columns.todo}
          onAddTask={() => onAddTaskClick("todo")}
          onTaskClick={onTaskClick}
        />
        <Column
          id="doing"
          title="In Progress"
          tasks={columns.doing}
          onAddTask={() => onAddTaskClick("doing")}
          onTaskClick={onTaskClick}
        />
        <Column
          id="done"
          title="Complete"
          tasks={columns.done}
          onAddTask={() => onAddTaskClick("done")}
          onTaskClick={onTaskClick}
        />
      </div>
    </DragDropContext>
  );
}
