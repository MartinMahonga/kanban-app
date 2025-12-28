import { X } from "lucide-react";

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors"><X/></button>
        </div>
        {children}
      </div>
    </div>
  );
};