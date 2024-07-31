'use client'

import * as React from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { columns } from './columns'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FakerService } from '@/client'

export function DataTable() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const data = useQuery({
    queryKey: ['data-table'],
    queryFn: () => FakerService.getFakerUserListApi(pagination),
  })
  const dataQuery = useQuery({
    queryKey: ['data', pagination.pageIndex, pagination.pageSize],
    queryFn: () => FakerService.getFakerUserListApi(pagination),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  })

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )

  const table = useReactTable({
    data: dataQuery.data ? dataQuery.data?.list : data.data ? data?.data?.list : [],
    // data: dataQuery.data?.rows || [],
    columns,
    rowCount: dataQuery.data?.total,
    getCoreRowModel: getCoreRowModel(),
    // 排序
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // 分页
    manualPagination: true, // 我们正在进行手动“服务器端”分页
    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
    onPaginationChange: setPagination,
    debugTable: true,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  })

  return (
    <div className="rounded-md">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter firstName..."
          value={(table.getColumn('firstName')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('firstName')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length
            ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )
            : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center">
          <div>
            <Select defaultValue="10" value={`${table.getState().pagination.pageSize}`} onValueChange={val => table.setPageSize(Number(val))}>
              <SelectTrigger className="">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="10">10条/页</SelectItem>
                  <SelectItem value="20">20条/页</SelectItem>
                  <SelectItem value="50">50条/页</SelectItem>
                  <SelectItem value="100">100条/页</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[200px] ml-2">
            共
            <span className="text-primary">{dataQuery.data?.total || 0}</span>
            条数据
          </div>
          {dataQuery.isFetching ? 'Loading...' : null}
        </div>
        <Pagination className="">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                simple
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>
            <Input
              type="number"
              max={table.getPageCount()}
              min={1}
              value={table.getState().pagination.pageIndex + 1}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="h-8 p-1 text-center"
            />
            <span className="mx-1">
              /
            </span>
            {table.getPageCount().toLocaleString()}

            <PaginationItem>
              <PaginationNext
                simple
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1}
            {' '}
            of
            {' '}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show
              {' '}
              {pageSize}
            </option>
          ))}
        </select>
        {dataQuery.isFetching ? 'Loading...' : null}
      </div> */}
    </div>
  )
}
