'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { MenuItemType } from './data'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/icon'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

function getChildPath(list: MenuItemType[], paths: string[] = []) {
  list.forEach((item: MenuItemType) => {
    if (item.children) {
      getChildPath(item.children, paths)
    } else {
      paths.push(item.link || 'unknown')
    }
  })
  return paths
}

export function NavGroup({
  label,
  icon,
  children,
  childList,
}: {
  label: string
  icon?: string
  childList?: MenuItemType[]
  children: React.ReactNode[]
}) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const { isSidebarOpen } = useSidebar()

  const ref = useRef<HTMLDivElement | null>(null)
  const childPaths = useMemo(() => {
    return getChildPath(childList || [], [])
  }, [childList])
  useEffect(() => {
    if (childPaths.includes(pathname)) {
      setIsActive(true)
      setIsOpen(true)
    } else {
      setIsOpen(false)
      setIsActive(false)
    }
  }, [childPaths, pathname])

  const toggle = () => {
    setIsOpen(prev => !prev)
  }
  if (isSidebarOpen) {
    return (
      <div className={cn(
        'group',
        {
          open: isOpen,
        },
      )}
      >
        <div
          role="button"
          onClick={toggle}
          className={cn('flex items-center mx-3 rounded-lg my-1 p-3 hover:bg-[#e6f4ff] peer-invalid:bg-[#e6f4ff]', {
            'text-primary': isActive,
          })}
        >
          {icon && <Icon name={icon} />}
          <span
            className="font-normal mx-4 text-sm"
          >
            {label}
          </span>
          <span className="ml-auto">
            <span hidden={isOpen}>
              <Icon name="lucide:chevron-right" />
            </span>
            <span hidden={!isOpen}>
              <Icon name="lucide:chevron-down" />
            </span>
          </span>
        </div>
        <div
          ref={ref}
          aria-hidden={!isOpen}
          // className={cn('ease overflow-hidden text-gray-600 duration-300 group-[.open]:bg-red-200')}
          className={cn('ease overflow-hidden text-gray-600 duration-300')}
          style={
            isOpen
              ? { height: `${ref.current?.scrollHeight}px` }
              : { height: '0' }
          }
        >
          {children}
        </div>
      </div>
    )
  } else {
    return (
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger>
          {' '}
          <div
            onClick={toggle}
            className={cn('flex items-center mx-3 rounded-lg my-1 p-3 hover:bg-[#e6f4ff] peer-invalid:bg-[#e6f4ff]', {
            })}
          >
            {icon && <Icon name={icon} />}
          </div>
        </HoverCardTrigger>
        <HoverCardContent side="right" align="start" className="p-0 m-0 w-auto">
          {children}
        </HoverCardContent>
      </HoverCard>

    )
  }
}
