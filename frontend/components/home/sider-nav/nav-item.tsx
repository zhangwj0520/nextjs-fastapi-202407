'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/icon'
import { useSidebar } from '@/lib/hooks/use-sidebar'

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
  const { isSidebarOpen } = useSidebar()

  return (
    <Link href={href}>
      <span className={cn('flex items-center rounded-lg', pathname === href ? 'active bg-[#e6f4ff] text-primary' : 'hover:bg-[#e6f4ff]', isSidebarOpen || level === 0 ? 'mx-3 my-1 p-3' : 'm-1 p-2', {
        'pl-5': isSidebarOpen && level === 1,
      })}
      >
        {icon && <Icon name={icon} />}
        {(isSidebarOpen || level !== 0) && (
          <span
            className="font-normal mx-4 text-sm"
          >
            {label}
          </span>
        )}
      </span>
    </Link>
  )
}
