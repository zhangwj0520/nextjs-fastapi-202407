export interface MenuItemType {
  label: string
  link: string
  icon?: string

}
export interface MenuItemGroupType {
  label: string
  icon?: string
  children: ItemType[]
}

export type ItemType = MenuItemType | MenuItemGroupType

export const data: ItemType[] = [
  {
    label: 'Documents',
    link: '/',
    icon: 'lucide:layout-dashboard',
  },
  {
    label: '用户管理',
    icon: 'lucide:users',
    children: [
      {
        label: '用户列表',
        link: '/user',
        icon: 'lucide:layout-dashboard',
      },
      {
        label: '用户权限',
        link: '/promission',
        icon: 'lucide:layout-dashboard',
      },
    ],
  },
  {
    label: '事件管理',
    icon: 'lucide:users',
    children: [
      {
        label: '用户列表',
        link: '/user',
        icon: 'lucide:layout-dashboard',
      },
      {
        label: '用户权限',
        link: '/promission',
        icon: 'lucide:layout-dashboard',
      },
    ],
  },

]
