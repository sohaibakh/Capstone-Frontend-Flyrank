export function TargetIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
