import { NavItem } from './nav-item'
import { NavGroup } from './nav-group'
import type { ItemType, MenuItemGroupType, MenuItemType } from './data'
import { data } from './data'

function generateNavItem(list: ItemType[], level = 0) {
  return list.map((item) => {
    if ((item as MenuItemGroupType).children) {
      return (
        <NavGroup key={item.label} label={item.label} icon={item.icon}>
          {generateNavItem((item as MenuItemGroupType).children, level + 1)}
        </NavGroup>
      )
    }
    return (
      <NavItem key={item.label} href={(item as MenuItemType).link} label={item.label} icon={item.icon} level={level} />
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
