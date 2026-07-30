import { ReactNode } from 'react'

interface TextOverflowProps {
  children: ReactNode
  className?: string
  lines?: 1 | 2 | 3
  title?: string
}

export function TextOverflow({ children, className = '', lines = 1, title }: TextOverflowProps) {
  const lineClampClass = {
    1: 'line-clamp-1',
    2: 'line-clamp-2',
    3: 'line-clamp-3'
  }[lines]

  return (
    <span 
      className={`block truncate ${lineClampClass} ${className}`}
      title={title || (typeof children === 'string' ? children : undefined)}
    >
      {children}
    </span>
  )
}
