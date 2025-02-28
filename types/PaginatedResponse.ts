export interface PaginatedResponse<T> {
    totalItemsCount: number;
    currentPage: number;
    totalPagesCount: number;
    items: T[];
  }
  