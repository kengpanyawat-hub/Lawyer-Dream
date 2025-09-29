import React from 'react'

export default function Section({ title, action, children }:{
  title: string,
  action?: React.ReactNode,
  children: React.ReactNode
}){
  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}
