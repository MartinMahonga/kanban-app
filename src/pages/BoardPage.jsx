import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Board from "../components/kanban/Board";
import CreateTaskModal from "../components/kanban/CreateTaskModal";
import TaskDetailsPanel from "../components/kanban/TaskDetailsPanel";
import ProjectMembersModal from "../components/projects/ProjectMembersModal"; // Import
import { fetchTasks, createTask } from "../services/task";
import { fetchProject } from "../services/project";
import { useToast } from "../context/ToastContext";
import { Skeleton } from "../components/ui/Skeleton";

export default function BoardPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false); // New state
  const [targetStatus, setTargetStatus] = useState("todo");

  // Details Panel State
  const [selectedTask, setSelectedTask] = useState(null);

  const loadData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const [projectData, tasksData] = await Promise.all([
        fetchProject(id),
        fetchTasks(id),
      ]);
      setProject(projectData);

      // Robust extraction of tasks array
      let loadedTasks = [];
      if (Array.isArray(tasksData)) {
        loadedTasks = tasksData;
      } else if (tasksData && Array.isArray(tasksData.data)) {
        loadedTasks = tasksData.data;
      } else if (tasksData && Array.isArray(tasksData.tasks)) {
        // Some APIs might return { tasks: [...] }
        loadedTasks = tasksData.tasks;
      }

      console.log("BoardPage: Loaded tasks:", loadedTasks);
      console.log("BoardPage: Raw tasksData:", tasksData);
      setTasks(loadedTasks);
    } catch (error) {
      console.error("Failed to load board data", error);
      toast.error("Failed to load project data. Please try again.");
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleCreateTask = async (taskData) => {
    try {
      console.log("Creating task with data:", taskData);
      const result = await createTask(id, taskData);
      console.log("Task created successfully:", result);
      toast.success("Task created successfully");
      loadData(); // Refresh tasks
    } catch (error) {
      console.error("Failed to create task", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  const handleOpenAddTask = (status) => {
    setTargetStatus(status);
    setIsModalOpen(true);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleTaskUpdate = (updatedTask) => {
    if (!updatedTask) {
      loadData(true);
      return;
    }
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    );
    setSelectedTask(updatedTask);
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full relative space-y-6 animate-in fade-in duration-500">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Board Columns Skeleton */}
        <div className="flex h-full gap-6 overflow-x-auto pb-4">
          {[1, 2, 3].map((col) => (
            <div
              key={col}
              className="w-80 flex-shrink-0 bg-slate-50/50 rounded-xl p-4 space-y-4"
            >
              <Skeleton className="h-6 w-24" />
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white p-4 rounded-lg border border-slate-200 space-y-3"
                >
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!project) return <div>Project not found</div>;

  return (
    <div className="flex flex-col h-full relative">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{project.nom}</h1>
          <p className="text-slate-500">{project.description}</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-x-auto">
        <Board
          projectId={id}
          tasks={tasks}
          onTaskUpdate={() => loadData(true)}
          onAddTaskClick={handleOpenAddTask}
          onTaskClick={handleTaskClick}
        />
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
        defaultStatus={targetStatus}
      />

      {project && (
        <ProjectMembersModal
          isOpen={isMembersModalOpen}
          onClose={() => setIsMembersModalOpen(false)}
          project={project}
          onUpdate={loadData}
        />
      )}

      {selectedTask && (
        <TaskDetailsPanel
          projectId={id}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
          project={project}
        />
      )}
    </div>
  );
}
