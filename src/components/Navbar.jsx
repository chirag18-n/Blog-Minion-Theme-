import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogOutUser } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

export function MinionEmblem({ className = 'w-9 h-9' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 160"
      className={className}
    >
      <circle cx="80" cy="80" r="76" fill="#FFDE00" stroke="#1E2A45" strokeWidth="6" />
      {/* Goggle Straps */}
      <rect x="4" y="68" width="28" height="18" rx="4" fill="#1E2A45" />
      <rect x="128" y="68" width="28" height="18" rx="4" fill="#1E2A45" />
      {/* Goggle Frames */}
      <circle cx="56" cy="77" r="28" fill="#B0BEC5" stroke="#1E2A45" strokeWidth="5" />
      <circle cx="104" cy="77" r="28" fill="#B0BEC5" stroke="#1E2A45" strokeWidth="5" />
      {/* Lenses Inner White */}
      <circle cx="56" cy="77" r="20" fill="#FFFFFF" stroke="#1E2A45" strokeWidth="4" />
      <circle cx="104" cy="77" r="20" fill="#FFFFFF" stroke="#1E2A45" strokeWidth="4" />
      {/* Iris & Pupils */}
      <circle cx="59" cy="77" r="9" fill="#8D5B4C" />
      <circle cx="107" cy="77" r="9" fill="#8D5B4C" />
      <circle cx="60" cy="77" r="5" fill="#1E2A45" />
      <circle cx="108" cy="77" r="5" fill="#1E2A45" />
      {/* Eye highlights */}
      <circle cx="57" cy="74" r="3" fill="#FFFFFF" />
      <circle cx="105" cy="74" r="3" fill="#FFFFFF" />
      {/* Smile */}
      <path d="M 64 116 Q 80 132 96 116" stroke="#1E2A45" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Cute Cheeks */}
      <circle cx="52" cy="112" r="5" fill="#FF8A80" opacity="0.6" />
      <circle cx="108" cy="112" r="5" fill="#FF8A80" opacity="0.6" />
      {/* Banana Accent */}
      <path d="M 120 128 Q 135 125 142 138 Q 135 143 122 136 Z" fill="#FFE66D" stroke="#1E2A45" strokeWidth="2" />
    </svg>
  );
}

export function BobAvatar({ className = 'w-8 h-8' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#3A5BA0" stroke="#1E2A45" strokeWidth="4" />
      <circle cx="60" cy="48" r="32" fill="#FFDE00" stroke="#1E2A45" strokeWidth="3" />
      <rect x="22" y="44" width="76" height="12" rx="3" fill="#1E2A45" />
      <circle cx="60" cy="50" r="20" fill="#CFD8DC" stroke="#1E2A45" strokeWidth="3" />
      <circle cx="60" cy="50" r="14" fill="#FFFFFF" />
      <circle cx="61" cy="50" r="7" fill="#6D4C41" />
      <circle cx="62" cy="50" r="4" fill="#1E2A45" />
      <circle cx="60" cy="48" r="2" fill="#FFFFFF" />
      <path d="M 60 16 Q 56 8 50 10" stroke="#1E2A45" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 60 16 Q 64 6 70 8" stroke="#1E2A45" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 32 82 Q 60 76 88 82 L 95 116 Q 60 122 25 116 Z" fill="#3A5BA0" stroke="#1E2A45" strokeWidth="3" />
      <circle cx="42" cy="88" r="3" fill="#1E2A45" />
      <circle cx="78" cy="88" r="3" fill="#1E2A45" />
    </svg>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Auth state driven entirely by authSlice — no localStorage reads needed here
  const user = useSelector((state) => state.auth?.user);
  const isLoggedIn = Boolean(user);

  const handleLogout = () => {
  dispatch(LogOutUser()).then(() => navigate('/login'));
};

const handleCreateBlog = () => {
  if (!isLoggedIn) {
    toast.error('Please login first to write a blog.', {
      position: 'bottom-right',
    });

    navigate('/login');
    return;
  }

  navigate('/create');
};

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="sticky top-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl border-b-[2.5px] border-[#1e2a45]/20 shadow-sm">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group transition-transform active:scale-95"
          >
            <div className="transform group-hover:rotate-6 transition-transform duration-200">
              <MinionEmblem className="w-10 h-10 drop-shadow-sm" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-on-surface uppercase leading-none">
                Minion Blogs
              </span>
              <span className="text-[10px] font-bold text-secondary tracking-widest uppercase mt-0.5">
                Gru Labs Dispatch
              </span>
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Banana Counter Badge from Stitch */}
            <div className="hidden sm:flex items-center gap-1.5 bg-surface-container-high px-3 py-1 rounded-full border border-[#1e2a45]/20 shadow-[0_2px_0px_#1e2a45]">
              <span className="text-sm">🍌</span>
              <span className="text-xs font-extrabold text-on-surface">42</span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-2">
              <Link
                to="/"
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  location.pathname === '/'
                    ? 'bg-secondary text-on-secondary shadow-[0_2px_0px_#1e2a45]'
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                Feed
              </Link>
              
              <button
              type="button"
              onClick={handleCreateBlog}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${location.pathname === '/create'
                ? 'bg-primary-container text-on-surface border-[2px] border-[#1e2a45] shadow-[0_2px_0px_#1e2a45]'
                : 'bg-primary-container/80 text-on-surface border-[2px] border-[#1e2a45] shadow-[0_2px_0px_#1e2a45] hover:bg-primary-container'
                }`}
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Write Blog</span>
                </button>
            </nav>

            {/* Auth Conditional Display */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                {/* User avatar and name */}
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container-low border border-[#1e2a45]/20">
                  <BobAvatar className="w-7 h-7" />
                  <span className="text-xs font-bold text-on-surface hidden lg:inline max-w-[100px] truncate">
                    {user?.name || user?.email || 'Minion'}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-surface-container-high text-tertiary hover:bg-tertiary-container hover:text-on-tertiary-container border border-[#1e2a45]/20 transition-all active:translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    location.pathname === '/login'
                      ? 'bg-secondary text-on-secondary shadow-[0_2px_0px_#1e2a45]'
                      : 'text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary-container text-on-surface border-[2px] border-[#1e2a45] shadow-[0_3px_0px_#1e2a45] hover:bg-primary-fixed active:translate-y-0.5 active:shadow-[0_1px_0px_#1e2a45] transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Per Stitch Design) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-surface/95 backdrop-blur-xl border-t-[2.5px] border-[#1e2a45]/20 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="flex justify-around items-center h-16 px-4">
          {/* Feed Link */}
          <Link
            to="/"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition-all ${
              location.pathname === '/'
                ? 'text-secondary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">visibility</span>
            <span className="text-[11px] font-bold">Feed</span>
          </Link>

          {/* Center Raised Floating "+ Create" Button */}
          <button
          type="button"
          onClick={handleCreateBlog}
          className="flex items-center justify-center -mt-6 w-12 h-12 rounded-full bg-primary-container text-on-surface border-[2.5px] border-[#1e2a45] shadow-[0_4px_0px_#1e2a45] active:translate-y-1 active:shadow-[0_1px_0px_#1e2a45] transition-all">
            <span className="material-symbols-outlined text-[26px] font-black">add</span>
          </button>

          {/* Auth link / Logout */}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-full text-tertiary transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">logout</span>
              <span className="text-[11px] font-bold">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition-all ${
                location.pathname === '/login' || location.pathname === '/register'
                  ? 'text-secondary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">account_circle</span>
              <span className="text-[11px] font-bold">Login</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
