import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { FetchBlogs } from '../features/blogs/blogSlice';

export default function Feed() {
  const dispatch=useDispatch()

  /*
  const {blogs  , isLoading, isError, message} = useSelector(state=>state.blog)

    useEffect(() => {
    dispatch(FetchBlogs())
  }, [dispatch])*/

  const {
    blogs = [],
    isLoading,
    isError,
    message
  } = useSelector((state) => state.blog);
  
  useEffect(() => {
    dispatch(FetchBlogs());
  }, [dispatch]);
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6">
      {/* Top Header Row with API Status Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-surface-container-high">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Minion Dispatch Feed 🍌
          </h1>
          <p className="text-sm text-on-surface-variant mt-0.5">
            Real-time stories, mischief, and blueprints from the minion crew.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* API Route Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high border border-[#1e2a45]/20 rounded-full shadow-[0_2px_0px_#1e2a45]">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-on-surface-variant">
              GET /api/blogs
            </span>
            <span className="text-[10px] font-extrabold bg-primary-container text-on-surface px-1.5 py-0.5 rounded-full border border-[#1e2a45]/30">
              200 OK
            </span>
          </div>

         {!isLoading && !isError && (
            <span className="text-xs font-bold text-secondary bg-secondary-fixed px-2.5 py-1 rounded-full border border-[#1e2a45]/20">
              {blogs.length} {blogs.length === 1 ? 'Entry' : 'Entries'}
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area*/}
      {isLoading ? (
        <LoadingSkeleton count={6} />
      ) : isError ? (
        <ErrorMessage
          title="Gru Satellite Offline!"
          message={message}
          onRetry={() => dispatch(FetchBlogs())}
        />
      ) : blogs.length === 0 ? (
        /* Empty State from Stitch */
        <div className="w-full max-w-md mx-auto bg-surface-container-lowest rounded-3xl border-[2.5px] border-[#1e2a45] p-8 shadow-[0_8px_0px_#1e2a45] flex flex-col items-center text-center">
          {/* Ambient Goggle Eye Illustration */}
          <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary-container/40 animate-ping"></div>
            <div className="relative w-24 h-24 rounded-full bg-primary-container border-[2.5px] border-[#1e2a45] shadow-md flex items-center justify-center overflow-hidden">
              <svg
                className="w-20 h-20"
                fill="none"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect fill="#1E2A45" height="14" rx="3" width="100" x="0" y="43" />
                <circle cx="34" cy="50" fill="#CED9FD" r="22" stroke="#1E2A45" strokeWidth="2" />
                <circle cx="34" cy="50" fill="#FAFAFF" r="16" />
                <circle cx="66" cy="50" fill="#CED9FD" r="22" stroke="#1E2A45" strokeWidth="2" />
                <circle cx="66" cy="50" fill="#FAFAFF" r="16" />
                <circle cx="38" cy="48" fill="#524600" r="7" />
                <circle cx="39" cy="48" fill="#0E1B35" r="3.5" />
                <circle cx="70" cy="48" fill="#524600" r="7" />
                <circle cx="71" cy="48" fill="#0E1B35" r="3.5" />
                <path
                  d="M 38 74 Q 50 68 62 74"
                  fill="transparent"
                  stroke="#1E2A45"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
            </div>
            {/* Floating Banana Question Badge */}
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary-container border-[2px] border-[#1e2a45] text-on-surface shadow-sm flex items-center justify-center text-xs font-black">
              🍌?
            </div>
          </div>

          <h3 className="text-xl font-extrabold text-on-surface mb-1">
            Uh-oh, banana not found! 🍌
          </h3>
          <p className="text-sm text-on-surface-variant max-w-xs mb-6">
            No blogs published yet. Be the first minion to share some mischief!
          </p>

          <Link
            to="/create"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-primary-container text-on-surface border-[2.5px] border-[#1e2a45] shadow-[0_4px_0px_#1e2a45] hover:bg-primary-fixed active:translate-y-0.5 active:shadow-[0_1px_0px_#1e2a45] transition-all text-sm font-extrabold"
          >
            <span className="material-symbols-outlined text-[20px]">edit_square</span>
            <span>+ Write First Blog</span>
          </Link>
        </div>
      ) : (
        /* Blog Card Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}

      {/* Floating Action Button (FAB) from Stitch Design */}
      <div className="fixed bottom-20 sm:bottom-8 right-6 sm:right-8 z-30">
        <Link
          to="/create"
          className="group flex items-center gap-2 pl-3.5 pr-5 py-3 rounded-full bg-primary-container text-on-surface border-[2.5px] border-[#1e2a45] shadow-[0_6px_0px_#1e2a45] active:translate-y-1 active:shadow-[0_1px_0px_#1e2a45] hover:scale-[1.03] transition-all"
        >
          <div className="w-7 h-7 rounded-full bg-on-surface text-primary-container flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-[20px] font-black leading-none">
              add
            </span>
          </div>
          <span className="text-sm font-extrabold uppercase tracking-wide text-on-surface">
            New Blog
          </span>
        </Link>
      </div>
    </div>
  );
}
