import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { BobAvatar } from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { AddBlog } from '../features/blogs/blogSlice';
import toast from 'react-hot-toast';

export default function CreateBlog() {

  const { isSuccess, isLoading, isError, message } =
  useSelector((state) => state.blog);
  const user = useSelector((state) => state.auth?.user);
  const isLoggedIn = Boolean(user);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: ""
  })

  const { title, description, author } = formData

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }



  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please login first to publish a blog.", {
        position: "bottom-right",
      });
      
      navigate("/login");
      return;
    }
    try {
      await dispatch(AddBlog(formData)).unwrap();
      // Clear all inputs
      setFormData({
        title: "",
        description: "",
        author: "",
      });
      // Success message
      toast.success("Blog published successfully!", {
        position: "bottom-right",
      });
      // Redirect to Feed
      navigate("/");
    } catch (error) {
      toast.error(error || "Failed to publish blog.", {
        position: "bottom-right",
      });
    }
  };
  
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Please login first to write a blog.', {
        position: 'bottom-right',
      });
      
      navigate('/login');
      return;
    }
    
    if (isError && message) {
      toast.error(message, {
        position: 'bottom-right',
      });
    }
  }, [isLoggedIn, isError, message, navigate]);


  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6">
      {/* Top Deck Action Bar */}
      <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded-2xl border border-[#1e2a45]/20 shadow-sm">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-on-surface px-3 py-1.5 rounded-full hover:bg-surface-container-high transition-transform active:scale-95 text-xs font-bold"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
          <span>Cancel</span>
        </button>

        {/* Mode Tag */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container border border-[#1e2a45] text-on-surface text-xs font-extrabold shadow-[0_2px_0px_#1e2a45]">
          <span>🍌</span>
          <span>Create Mode</span>
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
          <span className="material-symbols-outlined text-[18px]">bolt</span>
          <span className="font-mono truncate">POST /api/blogs (Bearer Auth)</span>
        </div>
        <span className="material-symbols-outlined text-[16px]">verified_user</span>
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
                {author || 'Minion Author'}
              </span>
              <p className="text-xs text-on-surface-variant font-medium">
                Lab Author Dispatch
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-full text-[11px] font-bold text-on-surface">
            <span className="material-symbols-outlined text-[14px] text-secondary">shield</span>
            <span>Auth Protected</span>
          </div>
        </div>


        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Title Field */}
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

          {/* Author Field */}
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

          {/* Description / Content Body Field */}
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
            error={isError}
            helperText="Write your full story or description here."
          />

          {/* Helper Callout Box from Stitch */}
          <div className="flex items-start gap-3 bg-surface-container-high p-4 rounded-2xl border border-[#1e2a45]/15">
            <div className="w-8 h-8 rounded-full bg-primary-container border border-[#1e2a45] text-on-surface flex items-center justify-center shrink-0 shadow-sm text-sm">
              📢
            </div>
            <div>
              <p className="text-xs font-extrabold text-on-surface">
                Broadcasting to Headquarters
              </p>
              <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                Your post will appear instantly on the live feed for all minions to enjoy! Keep laboratory formulas secure.
              </p>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="w-full text-base"
              icon="send"
            >
              Publish Blog 🍌
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
