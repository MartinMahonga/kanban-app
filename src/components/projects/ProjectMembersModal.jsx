import { useState, useEffect } from "react";
import { X, UserPlus, Users, Check } from "lucide-react";
import { Button } from "../ui/Button";
import { fetchUsers } from "../../services/user";
import { addProjectMember } from "../../services/project";
import { useAuth } from "../../context/AuthContext";

export default function ProjectMembersModal({
  isOpen,
  onClose,
  project,
  onUpdate,
}) {
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selecteduserId, setSelectedUserId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (isOpen) {
      loadUsers();
    }
  }, [isOpen]);

  const loadUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const data = await fetchUsers();
      setAvailableUsers(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  if (!isOpen) return null;

  // Filter out users who are already members AND the current user
  const currentMembers = project.membres || [];
  const potentialMembers = availableUsers.filter(
    (user) =>
      !currentMembers.some((member) => member.id === user.id) &&
      user.id !== currentUser?.id,
  );

  const handleAddMember = async () => {
    if (!selecteduserId) return;
    setIsSubmitting(true);
    try {
      await addProjectMember(project.id, selecteduserId);
      // Ideally re-fetch project or update local state
      onUpdate();
      setSelectedUserId("");
    } catch (error) {
      console.error("Failed to add member", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">
              Membres du projet
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Add Member Section */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Ajouter un membre
            </h3>
            <div className="flex gap-2">
              <select
                value={selecteduserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="flex-1 p-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100"
                disabled={isSubmitting}
              >
                <option value="">Sélectionner un utilisateur...</option>
                {potentialMembers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
              <Button
                onClick={handleAddMember}
                disabled={!selecteduserId || isSubmitting}
                isLoading={isSubmitting}
                className="bg-slate-900 text-white hover:bg-slate-800 shrink-0"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>
          </div>

          {/* Current Members List */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Membres actuels ({currentMembers.length})
            </h3>
            <div className="space-y-2">
              {currentMembers.length > 0 ? (
                currentMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                        {member.name
                          ? member.name.charAt(0).toUpperCase()
                          : "?"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-slate-500">{member.email}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic py-4 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
                  Aucun membre dans ce projet pour le moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
