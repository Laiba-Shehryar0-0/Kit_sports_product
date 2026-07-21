export default function ErrorState({ message = 'Something went wrong.', onRetry, className = '' }) {
  return (
    <div className={`flex flex-col items-center gap-3 py-16 text-center ${className}`} role="alert">
      <p className="text-danger text-[0.9rem]">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="text-[11px] font-bold tracking-[1px] uppercase text-gold underline underline-offset-2"
        >
          Try again
        </button>
      )}
    </div>
  );
}
