export interface MenuItemType {
  label: string
  link?: string
  icon?: string
  children?: MenuItemType[]

}

export const data: MenuItemType[] = [
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
        link: '/user2',
        icon: 'lucide:layout-dashboard',
      },
      {
        label: '用户权限',
        link: '/user3',
        icon: 'lucide:layout-dashboard',
      },
    ],
  },

]
