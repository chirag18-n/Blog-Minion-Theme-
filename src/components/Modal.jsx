import Button from './Button';

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete This Blog?',
  description = 'Are you sure you want to proceed? This action cannot be reversed!',
  confirmText = 'Yes, Delete',
  cancelText = 'Cancel',
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm transition-opacity duration-200">
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border-[2.5px] border-[#1e2a45] shadow-[0_12px_0px_#1e2a45] flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Floating Danger Badge */}
        <div className="w-16 h-16 rounded-full bg-tertiary-container border-[2.5px] border-[#1e2a45] flex items-center justify-center shadow-[0_4px_0px_#1e2a45] -mt-12">
          <div className="w-12 h-12 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">delete_forever</span>
          </div>
        </div>

        {/* Badge Label */}
        <div className="inline-flex items-center gap-1 text-tertiary text-xs font-extrabold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[16px]">warning</span>
          <span>Irreversible Action</span>
        </div>

        {/* Title & Description */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-extrabold text-on-surface">
            {title}
          </h3>
          <p className="text-sm font-normal text-on-surface-variant leading-relaxed">
            {description}
          </p>
        </div>

        {/* Banana Warning Pill */}
        <div className="px-3.5 py-1 rounded-full bg-primary-container/40 border border-[#1e2a45]/30 text-xs font-bold text-on-surface">
          🍌 Gru Lab Safety Protocol Activated
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          <Button
            variant="ghost"
            size="md"
            onClick={onClose}
            disabled={loading}
            className="w-full sm:flex-1 order-2 sm:order-1"
          >
            {cancelText}
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={onConfirm}
            loading={loading}
            className="w-full sm:flex-1 order-1 sm:order-2"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
