import type { ReactNode } from "react";

type ActionButtonProps = {
  action: () => void;
  disabled?: boolean;
  children: ReactNode;
};

export default function ActionButton({
  action,
  disabled,
  children,
}: ActionButtonProps) {
  return (
    <button
      onClick={action}
      disabled={disabled ?? false}
      className="hover:not-disabled:scale-105 disabled:cursor-not-allowed active:scale-100 transition-transform shadow-surface bg-surface px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer flex items-center gap-1 justify-center"
    >
      {children}
    </button>
  );
}
