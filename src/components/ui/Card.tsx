import React from 'react';
import clsx from 'clsx';

export default function Card({
  children,
  className = '',
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('rounded-3xl bg-white/75 backdrop-blur-md ring-1 ring-white/40 shadow-glass', className)}>
      <div className="p-4 md:p-5">{children}</div>
    </div>
  );
}
