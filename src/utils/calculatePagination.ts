export type PaginationOptions = {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: string;
};

type OptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

const calculatePagination = (options: PaginationOptions): OptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sort_by || "created_at";
  const sortOrder = options.sort_order || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export default calculatePagination;
