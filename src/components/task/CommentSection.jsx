import { useState, useEffect } from 'react';
import { Send, Trash2, Loader2 } from 'lucide-react';
import { fetchComments, addComment, deleteComment } from '../../services/comment';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function CommentSection({ taskId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    loadComments();
  }, [taskId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await fetchComments(taskId);
      setComments(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error('Failed to load comments', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const response = await addComment(taskId, newComment);
      const comment = response.data || response;
      setComments([...comments, comment]);
      setNewComment('');
      toast.success('Comment added');
    } catch (error) {
      console.error('Failed to add comment', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter(c => c.id !== commentId));
      toast.success('Comment deleted');
    } catch (error) {
      console.error('Failed to delete comment', error);
      toast.error('Failed to delete comment');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Comment List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8">Pas de commentaire, soyez le premier a commenté</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-slate-300 flex items-center justify-center text-xs font-medium text-slate-600">
                    {comment.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{comment.user?.name || 'Unknown'}</p>
                    <p className="text-xs text-slate-500">
                      {comment.created_at && formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: fr })}
                    </p>
                  </div>
                </div>
                {user?.id === comment.user_id && (
                  <button
                    type="button"
                    onClick={() => handleDelete(comment.id)}
                    className="text-slate-400 hover:text-red-600 transition-colors p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <p className="text-sm text-slate-700 whitespace-pre-wrap">{comment.contenu}</p>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="border-t border-slate-200 pt-4">
        <div className="flex gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Écrire un commentaire..."
            className="flex-1 min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 resize-none"
            disabled={submitting}
          />
        </div>
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={!newComment.trim() || submitting}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Commenter
          </button>
        </div>
      </form>
    </div>
  );
}
