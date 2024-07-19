'use client'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/icon'

export function NavGroup({
  label,
  icon,
  children,
}: {
  label: string
  icon?: string
  children: React.ReactNode[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const toggle = () => {
    setIsOpen(prev => !prev)
  }
  return (
    <div>
      <div
        role="button"
        onClick={toggle}
        className={cn('flex items-center mx-3 rounded-lg my-1 p-3 hover:bg-[#e6f4ff]', {
          'bg-[#e6f4ff] text-primary': isOpen,
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
            <AngleRightIcon />
          </span>
          <span hidden={!isOpen}>
            <AngleDownIcon />
          </span>
        </span>
      </div>

      <div
        ref={ref}
        aria-hidden={!isOpen}
        className="ease overflow-hidden text-gray-600 duration-300"
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

  // return (
  //   <Link href={href}>
  //     <span className={cn('flex items-center mx-3 rounded-lg my-1 p-3 text-black', pathname === href ? 'bg-[#e6f4ff] text-primary' : 'hover:bg-[#e6f4ff]',
  //     )}
  //     >
  //       {icon && <Icon name={icon} />}
  //       <span
  //         className="font-normal mx-4 text-sm"
  //       >
  //         {label}
  //       </span>
  //     </span>
  //   </Link>
  // )
}

function AngleRightIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-1 h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function AngleDownIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-1 h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  )
}
