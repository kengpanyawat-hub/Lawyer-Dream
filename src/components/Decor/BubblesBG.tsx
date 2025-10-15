export default function BubblesBG({ className = '' }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="pointer-events-none absolute -top-24 -left-10 w-[440px] h-[440px] rounded-full blur-3xl opacity-45 bg-gradient-to-br from-primary-200 via-sky-200 to-indigo-100" />
      <div className="pointer-events-none absolute -bottom-28 right-0 w-[540px] h-[540px] rounded-full blur-3xl opacity-35 bg-gradient-to-tr from-indigo-200 via-sky-100 to-white" />
    </div>
  );
}
