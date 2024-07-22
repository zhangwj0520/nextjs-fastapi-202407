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
      <span className={cn('flex items-center rounded-lg flex-nowrap overflow-hidden mx-3 my-1 p-3 h-10', pathname === href ? 'active bg-[#e6f4ff] text-primary' : 'hover:bg-[#e6f4ff]', {
        'pl-5': isSidebarOpen && level === 1,
      })}
      >
        {icon && <Icon name={icon} />}
        {(isSidebarOpen || level !== 0) && (
          <span
            className="font-normal ml-4 text-sm text-nowrap"
          >
            {label}
          </span>
        )}
      </span>
    </Link>
  )
}
