import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center selection:bg-slate-200">
      <div className="animate-in fade-in zoom-in duration-500">
          <h1 className="text-9xl font-black text-slate-900 tracking-tighter mb-4">
            404
          </h1>
          <div className="h-2 w-24 bg-slate-900 mx-auto rounded-full mb-8" />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 animate-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-backwards">
        Page not found
      </h2>
      
      <p className="text-slate-500 max-w-md mx-auto mb-10 text-lg animate-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-backwards">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-backwards">
        <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all hover:scale-105"
        >
            <Home className="mr-2 h-4 w-4" />
            Go Home
        </Link>
        <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-200 text-slate-900 font-medium hover:bg-slate-50 transition-colors"
        >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
        </button>
      </div>
    </div>
  );
}
