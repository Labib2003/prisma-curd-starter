import { Category, Prisma } from "@prisma/client";
import prisma from "../utils/prisma";
import { CategoryFilters } from "../types/category.types";
import calculatePagination, {
  PaginationOptions,
} from "../utils/calculatePagination";

const createCategory = async (data: Category) => {
  return await prisma.category.create({ data });
};

const getCategoryById = async (id: string) => {
  return await prisma.category.findUnique({ where: { id } });
};

const getPaginatedCategories = async (
  filters: CategoryFilters,
  options: PaginationOptions,
) => {
  const { limit, skip, page, sortBy, sortOrder } = calculatePagination(options);
  const { search, ...filterData } = filters;

  const conditions: Prisma.CategoryWhereInput[] = [];

  if (search) {
    conditions.push({
      OR: ["name"].map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    conditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key as keyof typeof filterData],
        },
      })),
    });
  }

  const whereConditions = conditions.length > 0 ? { AND: conditions } : {};

  const result = await prisma.category.findMany({
    where: whereConditions,
    orderBy: { [sortBy]: sortOrder },
    skip: skip,
    take: limit,
  });
  const total = await prisma.category.count({ where: whereConditions });

  return {
    meta: { total, page, limit },
    data: result,
  };
};

const updateCategory = async (id: string, data: Partial<Category>) => {
  return await prisma.category.update({ where: { id }, data });
};

const deleteCategory = async (id: string) => {
  return await prisma.category.delete({ where: { id } });
};

export const categoryService = {
  createCategory,
  getCategoryById,
  getPaginatedCategories,
  updateCategory,
  deleteCategory,
};
