import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import Modal from '../components/Modal';
import { BobAvatar } from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { FetchBlog, FetchBlogs, RemoveBlog } from '../features/blogs/blogSlice';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const{user}=useSelector(state=>state.auth)
  const { blog, isLoading, isError, message} = useSelector(state => state.blog);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const blogId = blog._id || blog.id;
  const authorName = blog.author || 'Gru Laboratory Minion';
  const isOwner = user?._id === blog.user;

  useEffect(() => {
    if (id) {
      dispatch(FetchBlog(id));
    }
  }, [id,isError,message]);

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    setDeleteError(null);

    try {
      const result = await dispatch(RemoveBlog(blogId));
      
      if (RemoveBlog.fulfilled.match(result)) {
        setShowDeleteModal(false);
        navigate("/");
        return;
      }
      
      setDeleteError(result.payload || "Failed to delete blog.");
    } catch (error) {
      setDeleteError("Something went wrong while deleting the blog.");
    } finally {
      setDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6 animate-pulse">
        <div className="w-32 h-8 bg-surface-container-high rounded-full"></div>
        <div className="h-40 bg-surface-container-lowest rounded-3xl border-[2px] border-[#1e2a45]/20 p-6"></div>
        <div className="h-64 bg-surface-container-lowest rounded-3xl border-[2px] border-[#1e2a45]/20 p-6"></div>
      </div>
    );
  }

  if (isError || !blog || !blog._id) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-6 items-center">
        <ErrorMessage
          title="Blog Blueprint Missing!"
          message={typeof isError === 'string' ? isError : 'Could not find the requested blog entry.'}
          onRetry={() => dispatch(FetchBlog())}
        />
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-high border border-[#1e2a45]/20 text-xs font-bold text-on-surface hover:bg-surface-container-highest transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Return to Feed</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6">
      {/* Navigation Header Row */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-high border border-[#1e2a45]/20 text-on-surface text-xs font-bold shadow-[0_2px_0px_#1e2a45] active:translate-y-0.5 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Feed</span>
        </Link>

        {/* API Route Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high border border-[#1e2a45]/20 rounded-full text-[11px] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-mono text-secondary font-bold truncate max-w-[160px]">
            GET /api/blogs/{id}
          </span>
        </div>
      </div>

      {/* Author Ownership Header Card */}
      <div className="bg-surface-container-lowest rounded-3xl border-[2.5px] border-[#1e2a45] p-5 sm:p-6 shadow-[0_6px_0px_#1e2a45] flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Goggle Framed Avatar */}
            <div className="relative p-1 rounded-full bg-secondary-fixed border-[2px] border-[#1e2a45] shadow-[0_2px_0px_#1e2a45]">
              <BobAvatar className="w-11 h-11 sm:w-12 sm:h-12" />
              <div className="absolute -bottom-1 -right-1 bg-primary-container border border-[#1e2a45] text-on-surface p-0.5 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[12px]">verified</span>
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-base font-extrabold text-on-surface truncate">
                {authorName}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                <span className="material-symbols-outlined text-[14px] text-secondary">
                  badge
                </span>
                <span>Authorized Lab Contributor</span>
              </div>
            </div>
          </div>

          {/* Author Badge */}
          <div className="self-start sm:self-auto bg-primary-container/40 border border-[#1e2a45]/30 text-on-surface px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide">
            🍌 Dispatch Author
          </div>
        </div>

        {/* Action Buttons Bar: Edit & Delete */}
        {isOwner && (
          <div className="pt-2 border-t border-dashed border-outline-variant/40 flex items-center gap-3">
            <Button
            variant="secondary"
            size="md"
            onClick={() => navigate(`/edit/${blogId}`)}
            className="flex-1"
            icon="edit"
            >
              Edit Blog
            </Button>
              
            <Button
            variant="danger"
            size="md"
            onClick={() => {
              setDeleteError(null);
              setShowDeleteModal(true);
            }}
            className="flex-1"
            icon="delete"
            >
              Delete
              </Button>
              </div>
            )}

        {/* Deletion inline error if encountered */}
        {deleteError && (
          <div className="p-3 rounded-2xl bg-tertiary-container border-[2px] border-error text-on-error-container text-xs font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-error">error</span>
            <span>{deleteError}</span>
          </div>
        )}
      </div>

      {/* Main Article Content Card */}
      <article className="bg-surface-container-lowest rounded-3xl border-[2.5px] border-[#1e2a45] shadow-[0_8px_0px_#1e2a45] p-6 sm:p-8 flex flex-col gap-6">
        {/* Title */}
        <div className="flex flex-col gap-2 pb-4 border-b border-surface-container-high">
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-0.5 rounded-full bg-secondary-fixed border border-[#1e2a45]/20 text-on-secondary-fixed-variant text-xs font-extrabold">
            <span>🍌</span>
            <span>Minion Laboratory Dispatch</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface leading-tight tracking-tight">
            {blog.title}
          </h1>
        </div>

        {/* Description / Content Body */}
        <div className="text-base sm:text-lg text-on-surface leading-relaxed whitespace-pre-line font-normal">
          {blog.description}
        </div>

        {/* Denim Pocket Quote Highlight Accent */}
        <div className="bg-surface-container-high rounded-2xl p-4 sm:p-5 border-[2px] border-[#1e2a45]/20 flex items-start gap-3">
          <div className="bg-secondary text-on-secondary w-8 h-8 rounded-full border border-[#1e2a45] flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">format_quote</span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm italic font-bold text-on-surface">
              "Banana is not just a fruit, it is a way of life."
            </p>
            <span className="text-xs font-bold text-secondary mt-1">
              — Minion Official Lab Motto
            </span>
          </div>
        </div>
      </article>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
        title="Delete This Blog?"
        description={`Tulaliloo! Are you sure you want to delete "${blog.title}"? This action cannot be reversed!`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
