import * as React from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import type { ButtonProps } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-end', className)}
      {...props}
    />
  )
}
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
  disabled?: boolean
} & Pick<ButtonProps, 'size'> &
React.ComponentProps<'a'>

type PaginationPreviousProps = {
  simple?: boolean
} & PaginationLinkProps

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  disabled = false,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-disabled={disabled}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'aria-disabled:hover:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50',
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,

        }),
        { 'hover:cursor-not-allowed pointer-events-none opacity-50': false },
        className,
      )}
      {...props}
    />
  )
}
PaginationLink.displayName = 'PaginationLink'

function PaginationPrevious({
  className,
  disabled,
  simple = false,
  ...props
}: PaginationPreviousProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      aria-disabled={disabled}
      className={cn('gap-1 pl-2.5', className)}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      {!simple && <span>上一页</span>}
    </PaginationLink>
  )
}
PaginationPrevious.displayName = 'PaginationPrevious'

function PaginationNext({
  className,
  disabled,
  simple = false,
  ...props
}: PaginationPreviousProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      aria-disabled={disabled}
      className={cn('gap-1 pr-2.5', className)}
      {...props}
    >
      {!simple && <span>下一页</span>}
      <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
  )
}
PaginationNext.displayName = 'PaginationNext'

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <DotsHorizontalIcon className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
