export const FileUpload = ({ onFileSelect }) => (
  <div className="w-full">
    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-[#633BBC]/30 transition-all">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
        <p className="text-xs text-gray-500 font-medium">Cliquez ou glissez un fichier ici</p>
      </div>
      <input type="file" className="hidden" onChange={(e) => onFileSelect(e.target.files[0])} />
    </label>
  </div>
);