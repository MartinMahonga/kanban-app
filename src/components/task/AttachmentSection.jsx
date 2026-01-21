import { useState, useEffect, useRef } from 'react';
import { Upload, File, Trash2, Download, Loader2, X } from 'lucide-react';
import { fetchAttachments, uploadAttachment, deleteAttachment, getAttachmentUrl } from '../../services/attachment';
import { useToast } from '../../context/ToastContext';

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export default function AttachmentSection({ taskId }) {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    loadAttachments();
  }, [taskId]);

  const loadAttachments = async () => {
    try {
      setLoading(true);
      const data = await fetchAttachments(taskId);
      setAttachments(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error('Failed to load attachments', error);
      toast.error('Failed to load attachments');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    for (const file of files) {
      // Size limit: 10MB
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large (max 10MB)`);
        continue;
      }

      try {
        setUploading(true);
        setUploadProgress(0);
        const response = await uploadAttachment(taskId, file);
        const attachment = response.data || response;
        setAttachments([...attachments, attachment]);
        toast.success('File uploaded successfully');
      } catch (error) {
        console.error('Failed to upload file', error);
        toast.error(`Failed to upload ${file.name}`);
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (attachmentId) => {
    try {
      await deleteAttachment(attachmentId);
      setAttachments(attachments.filter(a => a.id !== attachmentId));
      toast.success('Attachment deleted');
    } catch (error) {
      console.error('Failed to delete attachment', error);
      toast.error('Failed to delete attachment');
    }
  };

  const handleDownload = (attachment) => {
    window.open(getAttachmentUrl(attachment.id), '_blank');
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
      {/* Upload Area */}
      <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-slate-300 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          multiple
          disabled={uploading}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
        >
          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-900">Cliquez pour télécharger les fichiers</p>
          <p className="text-xs text-slate-500 mt-1">PDF, images, documents (max 10MB)</p>
        </button>

        {uploading && (
          <div className="mt-4">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">Téléchargement...</p>
          </div>
        )}
      </div>

      {/* Attachments List */}
      <div className="space-y-2">
        {attachments.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">Pas de pièce jointes</p>
        ) : (
          attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors group"
            >
              <File className="h-5 w-5 text-slate-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{attachment.nom_original}</p>
                <p className="text-xs text-slate-500">
                  {attachment.taille && formatFileSize(attachment.taille)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleDownload(attachment)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(attachment.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
