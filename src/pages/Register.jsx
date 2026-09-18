import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

export default function Register() {
  // Auth slice drives loading/error/success state — use slice values directly
  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Genuine UI-local state: typed form values, inline validation errors, password toggle
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your minion codename.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please enter your banana mail.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.password) {
      errs.password = 'Please provide a secret password.';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  const handleSubmit = (e) => {
  e.preventDefault();

  if (!validate()) {
    return;
  }

  dispatch(RegisterUser(formData));
};


  // Dynamic Password Strength Meter
  const getPasswordStrength = () => {
    const len = formData.password.length;
    if (len === 0) return { label: 'Banana Shield', width: 'w-0', color: 'bg-outline-variant' };
    if (len < 6) return { label: 'Peeling... (Too Short)', width: 'w-1/3', color: 'bg-tertiary' };
    if (len < 10) return { label: 'Good Banana! 🍌', width: 'w-2/3', color: 'bg-primary-container' };
    return { label: 'Super Minion Armor! 🛡️', width: 'w-full', color: 'bg-secondary' };
  };

  const strength = getPasswordStrength();

  useEffect(() => {
  if (user) {
    navigate("/");
  }

  if (isError && message) {
    toast.error(message, {
      position: "bottom-right",
    });
  }}, [user, isError, message, navigate]);

  if (isLoading) {
    return (
      <h1 className="text-4xl my-6 text-center">Loading....</h1>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto py-6 sm:py-10 px-4">
      {/* Dynamic Goggle Eyes Avatar Header from Stitch */}
      <div className="relative flex flex-col items-center justify-center mb-6">
        {/* Goggle Strap Band */}
        <div className="absolute top-1/2 left-0 right-0 h-4 bg-inverse-surface rounded-full -translate-y-1/2 z-0"></div>

        {/* Dual Eyed Goggle Mascot */}
        <div className="relative z-10 flex items-center justify-center gap-1.5 bg-surface px-4 py-1 rounded-full border-[2px] border-[#1e2a45]">
          {/* Left Eye */}
          <div className="w-14 h-14 rounded-full bg-surface-container-highest border-[2.5px] border-[#1e2a45] shadow-[0_3px_0px_#1e2a45] flex items-center justify-center overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center relative">
              <div className={`w-5 h-5 rounded-full bg-on-background flex items-center justify-center transition-transform duration-200 ${showPassword ? 'scale-125' : ''}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 left-1"></span>
              </div>
            </div>
          </div>

          {/* Right Eye */}
          <div className="w-14 h-14 rounded-full bg-surface-container-highest border-[2.5px] border-[#1e2a45] shadow-[0_3px_0px_#1e2a45] flex items-center justify-center overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center relative">
              <div className={`w-5 h-5 rounded-full bg-on-background flex items-center justify-center transition-transform duration-200 ${showPassword ? 'scale-125' : ''}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 left-1"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Welcoming Pill Bubble */}
        <div className="mt-3 bg-primary-container border-[2px] border-[#1e2a45] px-4 py-1 rounded-full shadow-[0_2px_0px_#1e2a45]">
          <p className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1">
            <span>🎉</span>
            <span>Bello! Welcome to Gru Labs</span>
          </p>
        </div>
      </div>

      {/* Header Text */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          Join the Minion Crew! 🍌
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Create your account to start sharing banana blogs
        </p>
      </div>

      {/* Registration Card with Denim Pocket Motif */}
      <div className="relative bg-surface-container-lowest rounded-3xl border-[2.5px] border-[#1e2a45] shadow-[0_8px_0px_#1e2a45] p-6 sm:p-8 overflow-hidden">
        {/* Top Denim Seam Bar */}
        <div className="absolute top-0 inset-x-0 h-3 bg-secondary flex items-center justify-around px-4 opacity-90">
          <div className="w-2.5 h-0.5 bg-secondary-fixed rounded-full"></div>
          <div className="w-2.5 h-0.5 bg-secondary-fixed rounded-full"></div>
          <div className="w-2.5 h-0.5 bg-secondary-fixed rounded-full"></div>
          <div className="w-2.5 h-0.5 bg-secondary-fixed rounded-full"></div>
          <div className="w-2.5 h-0.5 bg-secondary-fixed rounded-full"></div>
        </div>

        {/* Tiny Protruding Woven Denim Label Tab */}
        <div className="absolute top-3 right-5 bg-secondary text-on-secondary px-2.5 py-0.5 rounded-b-md border-x border-b border-[#1e2a45] shadow-sm">
          <span className="text-[10px] font-extrabold tracking-widest uppercase block">
            GRU-99
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          {/* Name Field */}
          <Input
            id="register-name"
            name="name"
            label="Minion Codename (Full Name)"
            value={name}
            onChange={handleChange}
            placeholder="e.g. Kevin Stuart"
            required
            icon="badge"
            error={errors.name}
          />

          {/* Email Field */}
          <Input
            id="register-email"
            name="email"
            type="email"
            label="Banana Mail (Email)"
            value={email}
            onChange={handleChange}
            placeholder="kevin@gru-labs.com"
            required
            icon="mail"
            error={errors.email}
          />

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <Input
              id="register-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Secret Password"
              value={password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength={6}
              icon="lock"
              error={errors.password}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-on-surface-variant hover:text-on-surface p-1 rounded-full transition-colors flex items-center"
                  aria-label="Toggle password visibility"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              }
            />

            {/* Banana Strength Meter */}
            <div className="mt-1 px-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-on-surface-variant mb-1">
                <span>Shield Level:</span>
                <span className="text-secondary">{strength.label}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden border border-[#1e2a45]/20">
                <div className={`h-full ${strength.width} ${strength.color} transition-all duration-300`}></div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="w-full text-base"
              icon="rocket_launch"
            >
              Create Account
            </Button>
          </div>
        </form>

        {/* Security Badge */}
        <div className="mt-6 pt-4 border-t border-dashed border-outline-variant/40 flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full border border-[#1e2a45]/15 text-[11px] font-semibold text-on-surface">
            <span className="material-symbols-outlined text-[14px] text-secondary">
              verified_user
            </span>
            <span>Protected with JWT Bearer Auth</span>
          </div>
        </div>
      </div>

      {/* Switch to Login */}
      <div className="mt-6 text-center">
        <p className="text-sm font-normal text-on-surface-variant">
          Already part of the crew?{' '}
          <Link
            to="/login"
            className="text-secondary font-bold underline underline-offset-4 hover:text-primary transition-colors inline-flex items-center gap-0.5"
          >
            <span>Log In</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
