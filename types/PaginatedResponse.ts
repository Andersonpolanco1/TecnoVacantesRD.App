export class PaginatedResponse<T> {
  totalItemsCount: number;
  currentPage: number;
  totalPagesCount: number;
  items: T[];

  constructor(
    totalItemsCount: number,
    currentPage: number,
    totalPagesCount: number,
    items: T[]
  ) {
    this.totalItemsCount = totalItemsCount;
    this.currentPage = currentPage;
    this.totalPagesCount = totalPagesCount;
    this.items = items;
  }

  static emptyObject<T>(): PaginatedResponse<T> {
    return new PaginatedResponse<T>(0, 0, 0, []);
  }
}
