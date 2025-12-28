import { Package } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-white rounded-3xl">
      {/* Icône de boîte grise */}
      <div className="mb-6 text-gray-400">
        <Package size={150} strokeWidth={1.5} />
      </div>
      
      {/* Texte principal */}
      <h3 className="text-xl font-medium text-gray-400 mb-8">
        Vous avez aucun projet
      </h3>
    </div>
  );
};