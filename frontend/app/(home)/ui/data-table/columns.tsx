'use client'

import Image from 'next/image'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import type { Person } from './make-data'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// https://tanstack.com/table/v8/docs/api/core/column-def
export const columns: ColumnDef<Person>[] = [
  // {
  //   id: 'index',
  //   cell: ({ row }) => {
  //     return (
  //       <span>{row.index + 1}</span>
  //     )
  //   },
  // },
  {
    accessorKey: 'indexId',
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    accessorKey: 'firstName',
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    accessorFn: row => row.lastName,
    id: 'lastName',
    cell: info => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: props => props.column.id,
  },
  {
    accessorKey: 'age',
    header: () => 'Age',
    footer: props => props.column.id,
  },
  {
    accessorKey: 'visits',
    header: () => <span>Visits</span>,
    footer: props => props.column.id,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    footer: props => props.column.id,
  },
  {
    accessorKey: 'progress',
    header: 'Profile Progress',
    footer: props => props.column.id,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const person = row.original
      return (
        <DropdownMenu>
          <span className="flex gap-2">
            <Button>编辑</Button>
            <Button>删除</Button>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">

                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>

            </DropdownMenuTrigger>

          </span>

          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(person.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
// export const columns: ColumnDef<Person>[] = [
//   {
//     accessorKey: 'image', // 行对象的key
//     cell: ({ row }) => {
//       return (
//         <Image
//           alt="Product image"
//           className="aspect-square rounded-md object-cover"
//           height="64"
//           src={row.getValue('image') || 'https://avatars.githubusercontent.com/u/60835477?v=4'}
//           width="64"
//         />
//       )
//     },
//   },
//   {
//     accessorKey: 'email',
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//         >
//           邮件
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//   },
//   {
//     accessorKey: 'createdAt',
//     header: '创建时间',
//     cell: ({ row }) => {
//       return (
//         <div>{row.getValue('createdAt')}</div>
//       )
//     },
//   },
//   // {
//   //   accessorKey: 'amount',
//   //   header: () => <div className="text-right">Amount</div>,
//   //   cell: ({ row }) => {
//   //     const amount = Number.parseFloat(row.getValue('amount'))
//   //     const formatted = new Intl.NumberFormat('en-US', {
//   //       style: 'currency',
//   //       currency: 'USD',
//   //     }).format(amount)
//   //     return <div className="text-right font-medium">{formatted}</div>
//   //   },
//   // },
//   {
//     id: 'actions',
//     cell: ({ row }) => {
//       const payment = row.original
//       return (
//         <DropdownMenu>
//           <div className="flex gap-2">
//             <Button>编辑</Button>
//             <Button>删除</Button>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">

//                 <span className="sr-only">Open menu</span>
//                 <MoreHorizontal className="h-4 w-4" />
//               </Button>

//             </DropdownMenuTrigger>

//           </div>

//           <DropdownMenuContent align="start">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
// ]
