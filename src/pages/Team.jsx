import { useEffect, useState } from 'react';
import { fetchUsers } from '../services/user';
import { Loader2, Mail, User } from 'lucide-react';

export default function Team() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Failed to load users", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Team Members</h1>
        <p className="text-slate-500">View and manage workspace members.</p>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-200">
            <p className="text-slate-500">No users found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-600 mb-4 ring-4 ring-white shadow-sm">
                {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-8 w-8" />}
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-1">{user.name || 'Unknown User'}</h3>
              
              <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4 bg-slate-50 px-3 py-1 rounded-full">
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate max-w-[180px]">{user.email}</span>
              </div>
              
               <div className="mt-auto w-full pt-4 border-t border-slate-50 text-xs text-slate-400 font-mono">
                  ID: #{user.id}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
