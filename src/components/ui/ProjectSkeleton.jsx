export const ProjectSkeleton = () => (
  <div className="bg-white rounded-[24px] border border-gray-100 p-6 space-y-4 animate-pulse">
    <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-100 rounded-lg w-full"></div>
      <div className="h-4 bg-gray-100 rounded-lg w-5/6"></div>
    </div>
    <div className="flex gap-2 pt-4">
      <div className="h-8 w-20 bg-gray-100 rounded-xl"></div>
      <div className="h-8 w-20 bg-gray-100 rounded-xl"></div>
    </div>
  </div>
);