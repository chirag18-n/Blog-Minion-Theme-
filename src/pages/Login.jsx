import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { MinionEmblem } from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Auth slice drives loading/error state — no local duplicates needed
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  // Genuine UI-local state: typed form values + password visibility toggle
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in or after successful login
  useEffect(() => {
    if (user) {
      navigate('/');
    }
    if (isError && message) {
      toast.error(message, { position: 'bottom-right' });
    }
  }, [user, isError, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Please fill in both email and password.", {
        position: "bottom-right",
      });
      return;
    }
    dispatch(
      LoginUser({
        email: email.trim(),
        password,
      })
    );
  };

  const setPresetCredentials = (minionName) => {
    setEmail(`${minionName.toLowerCase()}@gru-labs.com`);
    setPassword("GelatoBanana123");
  };


  return (
    <div className="w-full max-w-md mx-auto py-6 sm:py-10 px-4">
      {/* Interactive Mascot Anchor */}
      <div className="relative flex flex-col items-center justify-center mb-6">
        {/* Goggle Strap Bands */}
        <div className="absolute w-full h-6 bg-inverse-surface rounded-full z-0 top-1/2 -translate-y-1/2 opacity-90 shadow-sm"></div>

        {/* Center Mascot Goggle Frame */}
        <div className="relative z-10 p-2 bg-inverse-surface rounded-full shadow-[0_6px_0px_#1e2a45] transform hover:rotate-3 transition-transform duration-300">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-primary-container flex items-center justify-center border-[2.5px] border-[#1e2a45]">
            <MinionEmblem className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md" />
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <div className="text-center mb-6 px-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-secondary-container border border-[#1e2a45]/20 text-on-secondary-container text-xs font-extrabold uppercase tracking-wider mb-2 shadow-[0_2px_0px_#1e2a45]">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          <span>Gru Lab Authorized Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          Bello, Minion! 👋
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Enter your credentials to manage your blogs & banana stashes.
        </p>
      </div>

      {/* Main Login Card */}
      <div className="relative bg-surface-container-lowest rounded-3xl border-[2.5px] border-[#1e2a45] shadow-[0_8px_0px_#1e2a45] p-6 sm:p-8">
        {/* Banana Peel Accent Badge */}
        <div className="absolute -top-3.5 right-6 px-3 py-0.5 bg-primary-container border-[2px] border-[#1e2a45] text-on-surface text-xs font-extrabold rounded-full shadow-[0_2px_0px_#1e2a45] flex items-center gap-1 transform rotate-2">
          <span>🍌</span>
          <span>Crew Pass</span>
        </div>

        {/* Error Message Alert — shown via toast (see useEffect above) */}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Field */}
          <Input
            id="login-email"
            name="email"
            type="email"
            label="Minion Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="bob@gru-labs.com"
            required
            icon="badge"
          />

          {/* Password Field */}
          <Input
            id="login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Secret Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            icon="key"
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full transition-colors flex items-center"
                aria-label="Toggle password view"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            }
          />

          {/* Primary CTA Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="w-full text-base"
              icon="rocket_launch"
            >
              Login to Crew 🍌
            </Button>
          </div>
        </form>

        {/* Pocket Seam Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-0.5 bg-surface-container-highest rounded-full"></div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70">
            Quick Crew Autofill
          </span>
          <div className="flex-1 h-0.5 bg-surface-container-highest rounded-full"></div>
        </div>

        {/* Quick Lab Access Keys */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPresetCredentials('Kevin')}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high border border-[#1e2a45]/20 shadow-[0_2px_0px_#1e2a45] active:translate-y-0.5 text-xs font-bold transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">smart_toy</span>
            <span>Kevin Mode</span>
          </button>
          <button
            type="button"
            onClick={() => setPresetCredentials('Stuart')}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high border border-[#1e2a45]/20 shadow-[0_2px_0px_#1e2a45] active:translate-y-0.5 text-xs font-bold transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">music_note</span>
            <span>Stuart Mode</span>
          </button>
        </div>
      </div>

      {/* Switch to Register */}
      <div className="mt-6 text-center">
        <p className="text-sm font-normal text-on-surface-variant">
          New to Minion Blogs?{' '}
          <Link
            to="/register"
            className="text-secondary font-bold underline underline-offset-4 hover:text-primary transition-colors inline-flex items-center gap-0.5"
          >
            <span>Register here</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </p>

        {/* Live API Endpoint Tag */}
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-[#1e2a45]/15 text-on-surface-variant text-[11px] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
          <span className="font-extrabold uppercase">POST</span>
          <span className="font-mono text-secondary font-bold">/api/auth/login</span>
        </div>
      </div>
    </div>
  );
}
