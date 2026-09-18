export default function Input({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  icon = null,
  error = null,
  helperText = null,
  rightElement = null,
  className = '',
  as = 'input',
  rows = 5,
  min = null,
  max = null,
  minLength = null,
}) {
  const isTextarea = as === 'textarea';

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-bold uppercase tracking-wider text-on-surface flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-tertiary">*</span>}
          </span>
          {required && (
            <span className="text-[11px] text-secondary font-semibold">Required</span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 flex items-center justify-center w-7 h-7 rounded-full bg-surface-container text-secondary pointer-events-none">
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
          </div>
        )}

        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={rows}
            minLength={minLength}
            className={`w-full ${icon ? 'pl-12' : 'px-4'} py-3 rounded-2xl bg-surface-container-low text-on-surface font-normal placeholder:text-on-surface-variant/50 border-[2px] ${
              error ? 'border-error' : 'border-[#1e2a45]/15 focus:border-[#3b5ca1]'
            } outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all duration-200 resize-none shadow-sm`}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            min={min}
            max={max}
            minLength={minLength}
            className={`w-full ${icon ? 'pl-12' : 'px-4'} ${
              rightElement ? 'pr-12' : 'pr-4'
            } py-3 rounded-full bg-surface-container-low text-on-surface font-normal placeholder:text-on-surface-variant/50 border-[2px] ${
              error ? 'border-error' : 'border-[#1e2a45]/15 focus:border-[#3b5ca1]'
            } outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all duration-200 shadow-sm`}
          />
        )}

        {rightElement && (
          <div className="absolute right-3 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-error font-medium flex items-center gap-1 mt-0.5">
          <span className="material-symbols-outlined text-[14px]">error</span>
          <span>{error}</span>
        </p>
      )}

      {helperText && !error && (
        <p className="text-xs text-on-surface-variant font-medium flex items-center gap-1 mt-0.5">
          <span className="material-symbols-outlined text-[14px] text-secondary">info</span>
          <span>{helperText}</span>
        </p>
      )}
    </div>
  );
}
