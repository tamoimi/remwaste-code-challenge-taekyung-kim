function LoadingSkeletonCard() {
  return (
    <div className="border border-neutral-300 rounded-lg p-4 shadow-md bg-white animate-pulse">
      <div className="h-40 bg-neutral-200 rounded-lg mb-4" />
      <div className="h-5 bg-neutral-300 rounded w-3/4 mb-2" />
      <div className="h-4 bg-neutral-200 rounded w-1/2 mb-2" />
      <div className="h-5 bg-neutral-300 rounded w-full mb-4" />
      <div className="h-10 bg-neutral-200 rounded-xl" />
    </div>
  );
}
export default LoadingSkeletonCard;
