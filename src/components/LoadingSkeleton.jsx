
export default function LoadingSkeleton({ count = 3 }) {
  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col bg-surface-container-lowest rounded-2xl border-[2.5px] border-[#1e2a45]/20 shadow-[0_4px_0px_#1e2a45]/20 p-5 overflow-hidden animate-pulse"
        >
          {/* Top Bar Skeleton */}
          <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
            <div className="flex items-center gap-2.5">
              {/* Goggle Lens Avatar Bone */}
              <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-surface-container-high"></div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-20 h-3 bg-surface-container-highest rounded-full"></div>
                <div className="w-12 h-2.5 bg-surface-container rounded-full"></div>
              </div>
            </div>
            <div className="w-14 h-6 rounded-full bg-primary-container/40"></div>
          </div>

          {/* Body Skeleton */}
          <div className="py-4 flex flex-col gap-2.5">
            <div className="w-4/5 h-5 bg-surface-container-highest rounded-full"></div>
            <div className="w-full h-3.5 bg-surface-container rounded-full"></div>
            <div className="w-11/12 h-3.5 bg-surface-container rounded-full"></div>
            <div className="w-3/4 h-3.5 bg-surface-container rounded-full"></div>
          </div>

          {/* Footer Skeleton */}
          <div className="pt-3 border-t border-dashed border-outline-variant/30 flex items-center justify-between">
            <div className="w-24 h-4 bg-surface-container rounded-full"></div>
            <div className="w-20 h-7 bg-surface-container-high rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
