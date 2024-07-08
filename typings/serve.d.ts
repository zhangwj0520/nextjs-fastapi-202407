declare namespace Serve {
  interface Pagination {
    total: number
    current: number
    pageSize: number
  }

  interface ListResponse<T> {
    list: T[]
    total: number
    pagination?: Pagination
  }

}
