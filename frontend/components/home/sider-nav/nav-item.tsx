'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/icon'

export function NavItem({
  href = 'unknown',
  label,
  icon,
  level,
}: {
  href?: string
  label: string
  icon?: string
  level?: number
}) {
  const pathname = usePathname()

  return (
    <Link href={href}>
      <span className={cn('flex items-center mx-3 rounded-lg my-1 p-3', pathname === href ? 'active bg-[#e6f4ff] text-primary' : 'hover:bg-[#e6f4ff]', {
        'pl-5': level === 1,
      })}
      >
        {icon && <Icon name={icon} />}
        <span
          className="font-normal mx-4 text-sm"
        >
          {label}
        </span>
      </span>
    </Link>
  )
}
