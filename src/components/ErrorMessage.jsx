import Button from './Button';

export default function ErrorMessage({

  title = 'Gru Satellite Offline!',
  message = 'Please check your connection and retry. Signal lost somewhere over the Arctic hideout.',
  onRetry,
}) {
  return (
    <div className="w-full max-w-xl mx-auto bg-surface-container-lowest rounded-2xl p-6 border-[2.5px] border-[#1e2a45] shadow-[0_6px_0px_#1e2a45] flex flex-col gap-4">
      <div className="flex items-start gap-4">
        {/* Satellite Dish Icon */}
        <div className="w-12 h-12 rounded-full bg-secondary-container border-[2px] border-[#1e2a45] text-on-secondary-container flex items-center justify-center flex-shrink-0 shadow-[0_2px_0px_#1e2a45]">
          <span className="material-symbols-outlined text-[26px]">satellite_alt</span>
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-secondary">
              Communication Alert
            </span>
            <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
          </div>

          <h4 className="text-lg font-extrabold text-on-surface mt-0.5">
            {title}
          </h4>

          <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      {onRetry && (
        <div className="flex items-center justify-end pt-2 border-t border-dashed border-outline-variant/40">
          <Button variant="primary" size="sm" onClick={onRetry} icon="cached">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
