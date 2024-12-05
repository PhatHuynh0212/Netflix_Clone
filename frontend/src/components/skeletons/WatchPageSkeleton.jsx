const WatchPageSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-700 rounded-md w-40 h-6 mb-4 shimmer"></div>
      <div className="bg-gray-700 rounded-md w-full h-96 mb-4 shimmer"></div>
      <div className="bg-gray-700 rounded-md w-64 h-6 mb-2 shimmer"></div>
      <div className="bg-gray-700 rounded-md w-44 h-6 mb-2 shimmer"></div>
      <div className="bg-gray-700 rounded-md w-80 h-6 mb-4 shimmer"></div>
      <div className="bg-gray-700 rounded-md w-full h-44 mb-4 shimmer"></div>
    </div>
  );
};

export default WatchPageSkeleton;
