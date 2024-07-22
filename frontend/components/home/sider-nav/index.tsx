'use client'
import { NavItem } from './nav-item'
import { NavGroup } from './nav-group'
import type { MenuItemType } from './data'
import { data } from '@/config'
import { Icon } from '@/components/icon'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'

function generateNavItem(list: MenuItemType[], level = 0) {
  return list.map((item) => {
    if (item.children) {
      return (
        <NavGroup key={item.label} label={item.label} icon={item.icon} childList={item.children}>
          {generateNavItem(item.children, level + 1)}
        </NavGroup>
      )
    }
    return (
      <NavItem key={item.label} href={item.link} label={item.label} icon={item.icon} level={level} />
    )
  })
}

export function DesktopNav() {
  const { toggleSidebar, isSidebarOpen } = useSidebar()

  return (
    <aside className={cn('inset-y-0 left-0 z-10 hidden flex flex-col border-r bg-background sm:flex transition-all duration-300', isSidebarOpen ? ' w-[200px]' : ' w-[68px]')}>
      <div className="h-8 m-4 rounded-lg bg-primary/30"></div>
      <div className="flex-1 overflow-auto">{generateNavItem(data)}</div>
      <div className="h-8 m-4 rounded-lg bg-primary/30 flex justify-center items-center hover:cursor-pointer" onClick={toggleSidebar}>
        <Icon name="lucide:chevrons-left" className={cn('text-primary ease-in transition-all duration-300', isSidebarOpen ? '' : 'rotate-180')}></Icon>
      </div>
    </aside>
  )
}
