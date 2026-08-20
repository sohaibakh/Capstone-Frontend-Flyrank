export function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
