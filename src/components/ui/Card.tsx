import React from 'react'
export default function Card({ children, className='' }: { children: React.ReactNode, className?: string }){
  return (
    <div
      className={`glass rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(2,6,23,.16)] ${className}`}
    >
      {children}
    </div>
  )
}
