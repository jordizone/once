"use client";

interface WeekNavProps {
  label: string;
  onPrev: () => void;
  onNext: () => void;
}

export function WeekNav({ label, onPrev, onNext }: WeekNavProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 text-xs">
      <button
        onClick={onPrev}
        className="text-fg-muted hover:text-fg px-2 py-1 border border-border hover:bg-bg-secondary transition-colors"
      >
        &lt; PREV
      </button>
      <span className="text-fg-muted">{label}</span>
      <button
        onClick={onNext}
        className="text-fg-muted hover:text-fg px-2 py-1 border border-border hover:bg-bg-secondary transition-colors"
      >
        NEXT &gt;
      </button>
    </div>
  );
}
