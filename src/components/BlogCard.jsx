import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
  const blogId = blog?._id || blog?.id;
  const authorName = blog?.author || 'Anonymous Minion';

  return (
    <article className="relative flex flex-col bg-surface-container-lowest rounded-2xl border-[2.5px] border-[#1e2a45] shadow-[0_6px_0px_#1e2a45] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_0px_#1e2a45]">
      {/* Top Denim Header Bar with Stitch Seam */}
      <div className="relative w-full h-12 bg-secondary flex items-center justify-between px-4">
        {/* Stitching dashes */}
        <div className="flex items-center gap-1.5 opacity-60">
          <div className="w-2.5 h-0.5 bg-secondary-fixed rounded-full"></div>
          <div className="w-2.5 h-0.5 bg-secondary-fixed rounded-full"></div>
          <div className="w-2.5 h-0.5 bg-secondary-fixed rounded-full"></div>
        </div>

        {/* Goggle Avatar Stamp */}
        <div className="flex items-center gap-2 bg-surface/90 px-3 py-1 rounded-full border border-[#1e2a45] shadow-[0_2px_0px_#1e2a45]">
          <div className="w-5 h-5 rounded-full bg-primary-container border border-[#1e2a45] flex items-center justify-center text-[10px]">
            👓
          </div>
          <span className="text-xs font-bold text-on-surface truncate max-w-[120px]">
            {authorName}
          </span>
        </div>

        {/* Mini Banana Accent */}
        <div className="flex items-center gap-1 bg-primary-container px-2 py-0.5 rounded-full border border-[#1e2a45] text-xs font-bold text-on-surface">
          <span>🍌</span>
          <span>Blog</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-extrabold text-on-surface leading-tight tracking-tight line-clamp-2">
            {blog.title}
          </h2>

          <p className="text-sm font-normal text-on-surface-variant leading-relaxed line-clamp-3">
            {blog.description}
          </p>
        </div>

        {/* Card Footer with Read Link */}
        <div className="pt-3 border-t-2 border-dashed border-outline-variant/40 flex items-center justify-between">
          <span className="text-xs font-semibold text-secondary flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary-container border border-[#1e2a45]"></span>
            Gru Labs Dispatch
          </span>

          <Link
            to={`/blogs/${blogId}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-container text-on-surface border-[2px] border-[#1e2a45] shadow-[0_3px_0px_#1e2a45] hover:bg-primary-fixed active:translate-y-0.5 active:shadow-[0_1px_0px_#1e2a45] transition-all text-xs font-bold"
          >
            <span>Read Story</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
