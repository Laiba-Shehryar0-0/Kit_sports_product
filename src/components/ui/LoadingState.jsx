export default function LoadingState({ label = 'Loading…', className = '' }) {
  return (
    <div className={`flex items-center justify-center py-16 text-onsurface-500 text-[13px] tracking-[0.5px] ${className}`}>
      {label}
    </div>
  );
}
