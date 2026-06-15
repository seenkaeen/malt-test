import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'light'
type Size = 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight ' +
  'transition-[background-color,color,box-shadow,border-color,transform] duration-200 ease-out-expo ' +
  'cursor-pointer select-none whitespace-nowrap active:scale-[0.98] ' +
  'disabled:pointer-events-none disabled:opacity-60'

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-14 px-7 text-base',
}

const variants: Record<Variant, string> = {
  primary:
    'btn-bevel bg-forest text-cream hover:-translate-y-px hover:bg-forest-600',
  secondary:
    'bg-paper text-ink border border-line shadow-soft hover:-translate-y-px hover:border-line-strong hover:bg-cream hover:shadow-card',
  ghost: 'text-ink hover:bg-ink/[0.06]',
  dark: 'btn-bevel bg-ink text-cream hover:-translate-y-px hover:bg-ink-700',
  light:
    'bg-white/10 text-cream border border-white/20 backdrop-blur-sm hover:-translate-y-px hover:bg-white/15',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  withArrow?: boolean
  loading?: boolean
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AnchorProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function Button(props: ButtonProps | AnchorProps) {
  const {
    variant = 'primary',
    size = 'md',
    withArrow = false,
    loading = false,
    className = '',
    children,
    ...rest
  } = props

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  const inner = (
    <span className="relative z-10 inline-flex items-center gap-2">
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
      {withArrow && !loading && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5"
          aria-hidden
        />
      )}
    </span>
  )

  if ('href' in props && props.href !== undefined) {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a className={cls} {...anchorRest}>
        {inner}
      </a>
    )
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={cls} aria-busy={loading || undefined} {...buttonRest}>
      {inner}
    </button>
  )
}
