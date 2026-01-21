import { useState, useEffect } from "react";
import {
  X,
  Save,
  Calendar,
  AlignLeft,
  Tag,
  UserPlus,
  MessageSquare,
  Paperclip,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { updateTask, assignTask } from "../../services/task";
import { fetchUsers } from "../../services/user";
import { cn } from "../../lib/utils";
import CommentSection from "../task/CommentSection";
import AttachmentSection from "../task/AttachmentSection";
import LabelPicker from "../task/LabelPicker";

export default function TaskDetailsPanel({
  projectId,
  task,
  onClose,
  onUpdate,
  project,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [deadline, setDeadline] = useState("");
  const [assignedToIds, setAssignedToIds] = useState([]);
  const [users, setUsers] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("details"); // 'details', 'comments', 'attachments'

  useEffect(() => {
    if (task) {
      setTitle(task.titre);
      setDescription(task.description || "");
      setPriority(task.priorite || "medium");
      setDeadline(task.deadline ? task.deadline.split("T")[0] : ""); // Format for input[type="date"]

      // Handle both old single assignee and new multi-assignee structure
      if (Array.isArray(task.assignes)) {
        setAssignedToIds(task.assignes.map((u) => u.id));
      } else if (task.user_id) {
        setAssignedToIds([task.user_id]);
      } else {
        setAssignedToIds([]);
      }
    }
  }, [task]);

  useEffect(() => {
    // If project has members, use them for assignment
    if (project && project.membres && project.membres.length > 0) {
      setUsers(project.membres);
      return;
    }

    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Failed to load users", error);
      }
    };
    loadUsers();
  }, [project]);

  if (!task) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Update details
      const updatedTask = await updateTask(projectId, task.id, {
        titre: title,
        description: description,
        priorite: priority,
        deadline: deadline || null,
      });

      // Update assignment
      // We check if the set of IDs has changed to avoid redundant API calls
      const currentIds = Array.isArray(task.assignes)
        ? task.assignes.map((u) => u.id)
        : task.user_id
          ? [task.user_id]
          : [];
      const hasChanged =
        assignedToIds.length !== currentIds.length ||
        !assignedToIds.every((id) => currentIds.includes(id));

      let finalTask = updatedTask;
      if (hasChanged) {
        const assignmentResult = await assignTask(task.id, assignedToIds);
        // merge assignment result (which should contain the updated 'assignes' list)
        finalTask = { ...updatedTask, ...assignmentResult };
      }

      onUpdate(finalTask);
    } catch (error) {
      console.error("Failed to update task", error);
    } finally {
      setIsSaving(false);
    }
  };

  const priorities = [
    {
      value: "low",
      label: "Basse",
      color: "bg-green-100 text-green-700 hover:bg-green-200",
    },
    {
      value: "medium",
      label: "Moyenne",
      color: "bg-amber-100 text-amber-700 hover:bg-amber-200",
    },
    {
      value: "high",
      label: "Haute",
      color: "bg-red-100 text-red-700 hover:bg-red-200",
    },
  ];

  const tabs = [
    { id: "details", label: "Details", icon: AlignLeft },
    { id: "comments", label: "Comments", icon: MessageSquare },
    { id: "attachments", label: "Attachments", icon: Paperclip },
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[32rem] bg-white border-l border-slate-200 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="uppercase font-bold text-xs tracking-wider">
            {task.status === "done"
              ? "Terminé"
              : task.status === "doing"
                ? "En cours"
                : "À faire"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="text-purple-600 hover:bg-purple-50 p-2 rounded-full transition-colors"
            title="Sauvegarder"
          >
            <Save className="h-5 w-5" />
          </button>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "text-slate-900 border-b-2 border-slate-900 bg-slate-50"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50",
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "details" && (
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-bold border-transparent focus:border-slate-300 px-0 shadow-none h-auto py-1"
                placeholder="Task Title"
              />
            </div>

            {/* Priority */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Tag className="h-4 w-4" />
                Priorité
              </div>
              <div className="flex gap-2">
                {priorities.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPriority(p.value)}
                    className={cn(
                      "px-3 py-1 text-xs font-bold rounded-full transition-all border-2",
                      p.color,
                      priority === p.value
                        ? "border-current opacity-100"
                        : "border-transparent opacity-50 hover:opacity-100",
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Deadline */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Calendar className="h-4 w-4" />
                Date limite
              </div>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-100"
                />
                {deadline && (
                  <button
                    onClick={() => setDeadline("")}
                    className="px-3 py-2 text-sm text-slate-600 hover:text-red-600 transition-colors"
                  >
                    Effacer
                  </button>
                )}
              </div>
            </div>

            {/* Labels */}
            <LabelPicker taskId={task.id} onUpdate={onUpdate} />

            {/* Assignees */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <UserPlus className="h-4 w-4" />
                Assigné à
              </div>
              <div className="flex flex-wrap gap-2">
                {users.length > 0 ? (
                  users.map((user) => {
                    const isAssigned = assignedToIds.includes(user.id);
                    return (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => {
                          if (isAssigned) {
                            setAssignedToIds(
                              assignedToIds.filter((id) => id !== user.id),
                            );
                          } else {
                            setAssignedToIds([...assignedToIds, user.id]);
                          }
                        }}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-all",
                          isAssigned
                            ? "bg-purple-100 border-purple-300 text-purple-700 font-medium scale-105"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300",
                        )}
                      >
                        <div
                          className={cn(
                            "h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                            isAssigned
                              ? "bg-purple-600 text-white"
                              : "bg-slate-200 text-slate-500",
                          )}
                        >
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        {user.name}
                      </button>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Aucun membre disponible
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <AlignLeft className="h-4 w-4" />
                Description
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ajouter une description plus détaillée..."
                className="w-full min-h-[150px] p-3 text-sm text-slate-700 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all resize-none"
              />
            </div>

            {/* Meta Info */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Créé le</span>
                <span>{new Date(task.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>ID</span>
                <span className="font-mono">#{task.id}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "comments" && <CommentSection taskId={task.id} />}

        {activeTab === "attachments" && <AttachmentSection taskId={task.id} />}
      </div>

      {/* Footer Actions */}
      {activeTab === "details" && (
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <Button
            onClick={handleSave}
            isLoading={isSaving}
            className="w-full bg-purple-600 text-white hover:bg-purple-700"
          >
            Sauvegarder les modifications
          </Button>
        </div>
      )}
    </div>
  );
}
