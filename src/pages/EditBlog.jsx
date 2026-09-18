import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Button from "../components/Button";
import Input from "../components/Input";
import { BobAvatar } from "../components/Navbar";

import {
  FetchBlog,
  UpdateBlog,
} from "../features/blogs/blogSlice";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { blog, isLoading, isError, message } = useSelector(
    (state) => state.blog
  );

  const user = useSelector((state) => state.auth?.user);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
  });

  const { title, description, author } = formData;

  // Check login and fetch blog
  useEffect(() => {
    if (!user) {
      toast.error("Please login first to edit a blog.", {
        position: "bottom-right",
      });

      navigate("/login");
      return;
    }

    dispatch(FetchBlog(id));
  }, [dispatch, id, user, navigate]);

  // Populate form + check ownership
  useEffect(() => {
    if (!blog || !user) return;

    // Only blog owner can edit
    if (String(blog.user) !== String(user._id)) {
      toast.error("You can only edit your own blogs.", {
        position: "bottom-right",
      });

      navigate(`/blogs/${id}`);
      return;
    }

    setFormData({
      title: blog.title || "",
      description: blog.description || "",
      author: blog.author || "",
    });
  }, [blog, user, id, navigate]);

  // Show API errors
  useEffect(() => {
    if (isError && message) {
      toast.error(message, {
        position: "bottom-right",
      });
    }
  }, [isError, message]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first.", {
        position: "bottom-right",
      });

      navigate("/login");
      return;
    }

    if (!blog || String(blog.user) !== String(user._id)) {
      toast.error("You can only edit your own blogs.", {
        position: "bottom-right",
      });

      navigate(`/blogs/${id}`);
      return;
    }

    if (!title.trim() || !description.trim() || !author.trim()) {
      toast.error("Please fill in all fields.", {
        position: "bottom-right",
      });
      return;
    }

    try {
      await dispatch(
        UpdateBlog({
          id,
          title: title.trim(),
          description: description.trim(),
          author: author.trim(),
        })
      ).unwrap();

      toast.success("Blog updated successfully!", {
        position: "bottom-right",
      });

      navigate(`/blogs/${id}`);
    } catch (error) {
      toast.error(error || "Failed to update blog.", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6">
      {/* Top Deck Action Bar */}
      <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded-2xl border border-[#1e2a45]/20 shadow-sm">
        <button
          type="button"
          onClick={() => navigate(`/blogs/${id}`)}
          className="flex items-center gap-1 text-on-surface px-3 py-1.5 rounded-full hover:bg-surface-container-high transition-transform active:scale-95 text-xs font-bold"
        >
          <span className="material-symbols-outlined text-[18px]">
            close
          </span>
          <span>Cancel</span>
        </button>

        {/* Mode Tag */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container border border-[#1e2a45] text-on-surface text-xs font-extrabold shadow-[0_2px_0px_#1e2a45]">
          <span>✏️</span>
          <span>Edit Mode</span>
        </div>

        {/* Link to Feed */}
        <Link
          to="/"
          className="text-xs font-bold text-secondary hover:underline px-2 py-1"
        >
          View Feed
        </Link>
      </div>

      {/* API Endpoint Dispatch Info */}
      <div className="flex items-center justify-between px-4 py-2 bg-secondary-container border border-[#1e2a45]/20 text-on-secondary-container rounded-full text-xs font-bold shadow-sm">
        <div className="flex items-center gap-2 truncate">
          <span className="material-symbols-outlined text-[18px]">
            bolt
          </span>

          <span className="font-mono truncate">
            PUT /api/blogs/:id (Bearer Auth)
          </span>
        </div>

        <span className="material-symbols-outlined text-[16px]">
          verified_user
        </span>
      </div>

      {/* Main Form Card */}
      <div className="bg-surface-container-lowest rounded-3xl border-[2.5px] border-[#1e2a45] p-6 sm:p-8 shadow-[0_8px_0px_#1e2a45]">
        {/* Author Header */}
        <div className="flex items-center justify-between pb-5 mb-5 border-b border-surface-container-high">
          <div className="flex items-center gap-3">
            <div className="relative p-1 rounded-full bg-secondary-fixed border-[2px] border-[#1e2a45] shadow-sm">
              <BobAvatar className="w-10 h-10" />
            </div>

            <div>
              <span className="text-sm font-extrabold text-on-surface">
                {author || "Minion Author"}
              </span>

              <p className="text-xs text-on-surface-variant font-medium">
                Lab Author Dispatch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-full text-[11px] font-bold text-on-surface">
            <span className="material-symbols-outlined text-[14px] text-secondary">
              shield
            </span>
            <span>Auth Protected</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Title */}
          <Input
            id="blog-title"
            name="title"
            label="Blog Title"
            value={title}
            onChange={handleChange}
            placeholder="e.g. 10 Reasons Why Bananas Are the Ultimate Power Source"
            required
            icon="edit_note"
            error={isError}
          />

          {/* Author */}
          <Input
            id="blog-author"
            name="author"
            label="Author Codename"
            value={author}
            onChange={handleChange}
            placeholder="e.g. Bob the Minion"
            required
            icon="badge"
            error={isError}
          />

          {/* Description */}
          <Input
            as="textarea"
            rows={7}
            id="blog-description"
            name="description"
            label="Blog Story / Description"
            value={description}
            onChange={handleChange}
            placeholder="Share your experiments, mischief, or favorite fruit recipes with the minion crew..."
            required
            icon="description"
            error={isError}
            helperText="Update your story or description here."
          />

          {/* Helper Callout */}
          <div className="flex items-start gap-3 bg-surface-container-high p-4 rounded-2xl border border-[#1e2a45]/15">
            <div className="w-8 h-8 rounded-full bg-primary-container border border-[#1e2a45] text-on-surface flex items-center justify-center shrink-0 shadow-sm text-sm">
              ✏️
            </div>

            <div>
              <p className="text-xs font-extrabold text-on-surface">
                Updating Your Blog
              </p>

              <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                Your changes will be saved to the blog and reflected on the
                feed after the update is completed.
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="w-full text-base"
              icon="save"
            >
              Save Changes ✏️
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}