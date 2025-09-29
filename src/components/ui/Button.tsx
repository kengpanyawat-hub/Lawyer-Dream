import { cva } from 'class-variance-authority'
import clsx from 'clsx'
import Link from 'next/link'

const styles = cva('inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50', {
  variants: {
    variant: {
      primary: 'glass text-primary-900 hover:bg-white/20',
      solid: 'bg-primary-600 text-white hover:bg-primary-700',
      outline: 'border border-primary-600 text-primary-700 hover:bg-primary-50'
    }
  },
  defaultVariants: { variant: 'solid' }
})

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?: 'primary'|'solid'|'outline'}){
  const { className, variant='solid', ...rest } = props
  return <button className={clsx(styles({variant}), className)} {...rest} />
}

export function ButtonLink({ href, children, variant='solid', className }: { href: string, children: React.ReactNode, variant?: 'primary'|'solid'|'outline', className?: string }){
  return <Link href={href} className={clsx(styles({variant}), className)}>{children}</Link>
}
