export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-primary-light/30 rounded-button ${className}`} />
  );
}
