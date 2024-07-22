export interface MenuItemType {
  label: string
  link?: string
  icon?: string
  children?: MenuItemType[]

}

export const data: MenuItemType[] = [
  {
    label: 'Dashboard',
    link: '/',
    icon: 'lucide:layout-dashboard',
  },
  {
    label: 'Documents',
    link: '/doc',
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
  {
    label: '网盘管理',
    icon: 'lucide:users',
    children: [
      {
        label: '文件管理',
        link: '/user2',
        icon: 'lucide:layout-dashboard',
      },
      {
        label: '网盘概览',
        link: '/user3',
        icon: 'lucide:layout-dashboard',
      },
    ],
  },

]
