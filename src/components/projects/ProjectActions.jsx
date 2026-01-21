import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Trash2, Pencil } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function ProjectActions({ onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (e) => {
      e.preventDefault(); // Prevent link navigation if inside a link
      e.stopPropagation();
      
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
          top: rect.bottom + window.scrollY + 5,
          left: rect.right + window.scrollX - 160 // Align right
      });
      setIsOpen(!isOpen);
  };

  const handleAction = (e, action) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
      action();
  };

  return (
    <>
      <button 
        ref={buttonRef}
        onClick={toggleMenu}
        className="text-slate-400 hover:text-slate-600 p-1.5 rounded hover:bg-slate-200 transition-colors"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>

      {isOpen && createPortal(
        <div 
            ref={menuRef}
            style={{ top: coords.top, left: coords.left }}
            className="fixed z-50 w-40 bg-white rounded-md shadow-lg border border-slate-200 py-1 animate-in fade-in zoom-in-95 duration-100"
        >
            <button 
                onClick={(e) => handleAction(e, onEdit)}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-purple-100 flex items-center gap-2"
            >
                <Pencil className="h-4 w-4" />
                Modifier
            </button>
            <button 
                onClick={(e) => handleAction(e, onDelete)}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
                <Trash2 className="h-4 w-4" />
                Supprimer
            </button>
        </div>,
        document.body
      )}
    </>
  );
}
