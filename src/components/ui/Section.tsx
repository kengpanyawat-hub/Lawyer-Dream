import React from 'react';

export default function Section({
  title,
  action,
  children,
}: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="container-max">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
