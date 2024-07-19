import { NavItem } from './nav-item'
import { NavGroup } from './nav-group'
import type { MenuItemType } from './data'
import { data } from './data'

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
  return (
    <aside className="inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex w-[200px]">
      <div className="h-8 m-4 rounded-lg bg-primary/30"></div>
      {generateNavItem(data)}
    </aside>
  )
}
