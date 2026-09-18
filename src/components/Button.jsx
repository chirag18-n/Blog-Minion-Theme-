export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  icon = null,
}) {
  const baseClasses = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-150 ease-out select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:translate-y-0.5';

  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
  };

  const variantClasses = {
    primary: 'bg-primary-container text-on-surface border-[2.5px] border-[#1e2a45] shadow-[0_4px_0px_#1e2a45] hover:bg-primary-fixed hover:scale-[1.01] active:shadow-[0_1px_0px_#1e2a45]',
    secondary: 'bg-secondary text-on-secondary border-[2.5px] border-[#1e2a45] shadow-[0_4px_0px_#1e2a45] hover:bg-[#2e4d8a] hover:scale-[1.01] active:shadow-[0_1px_0px_#1e2a45]',
    danger: 'bg-tertiary text-on-tertiary border-[2.5px] border-[#1e2a45] shadow-[0_4px_0px_#1e2a45] hover:bg-[#920020] hover:scale-[1.01] active:shadow-[0_1px_0px_#1e2a45]',
    ghost: 'bg-surface-container-high text-on-surface border-[2px] border-outline-variant hover:bg-surface-container-highest active:shadow-none',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`}
    >
      {loading ? (
        <>
          <span className="material-symbols-outlined text-[18px] animate-spin">
            progress_activity
          </span>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
