import React, { useState } from "react";
import Modal from "../ui/Modal";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export default function CreateTaskModal({
  isOpen,
  onClose,
  onSubmit,
  defaultStatus = "todo",
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [deadline, setDeadline] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const taskData = {
        titre: title,
        description,
        priorite: priority,
        status: defaultStatus,
      };

      // Only add deadline if it's set
      if (deadline) {
        taskData.deadline = deadline;
      }

      await onSubmit(taskData);
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDeadline("");
      onClose();
    } catch (error) {
      console.error("Failed to create task:", error);
      // Error is now handled by toast in parent component
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Titre</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Que veux-tu faire?"
            required
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ajoute des details..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Priorité</label>
          <select
            className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Deadline (optionel)
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" isLoading={isLoading} className="bg-purple-600 shadow-sm hover:bg-purple-700">
            Créer une tache
          </Button>
        </div>
      </form>
    </Modal>
  );
}
