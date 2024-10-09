import { Icon as IconifyIcon, addCollection } from '@iconify/react'
// import { addCollection, enableCache } from 'iconify-icon'

// import dataSet from '@/assets/icons/custom.json'

// enableCache('local')
// addCollection(dataSet)

// enableCache('session');
// export declare interface IconifyIconProps extends IconifyIconCustomisations {
//   icon: IconifyIcon | string;
//   mode?: IconifyRenderMode;
//   color?: string;
//   flip?: string;
//   id?: string;
//   onLoad?: IconifyIconOnLoad;
// }
import dataSet from './output.json'

// console.log('dataSet', dataSet)
// enableCache('local')
addCollection(dataSet)

// enableCache('session')
// export declare interface IconifyIconProps extends IconifyIconCustomisations {
//   icon: IconifyIcon | string
//   mode?: IconifyRenderMode
//   color?: string
//   flip?: string
//   id?: string
//   onLoad?: IconifyIconOnLoad
// }
export interface IProps {
  name?: string
  className?: string
  style?: Record<string, string | number>
  inline?: boolean
  rotate?: number // 旋转
  flip?: string
  onClick?: () => void
}

export function Icon({ name, className, style, inline, rotate, flip, onClick }: IProps) {
  return (
    <IconifyIcon
      icon={name || 'logos:react'}
      className={`anticon ${className}`}
      style={{ ...style }}
      inline={inline || true}
      rotate={rotate}
      flip={flip}
      onClick={onClick}
    />
  )
}
