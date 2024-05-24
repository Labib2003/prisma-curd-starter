import httpStatus from "http-status";
import { categoryService } from "../services/category.service";
import catchAsync from "../utils/catchAsync";
import pick from "../utils/pick";

const createCategory = catchAsync(async (req, res) => {
  const data = req.body;

  const response = await categoryService.createCategory(data);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Category created successfully",
    data: response,
  });
});

const getCaegoryById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const response = await categoryService.getCategoryById(id);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Category fetched successfully",
    data: response,
  });
});

const getPaginatedCategories = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["search", "get_all", "role", "employee"]);
  const options = pick(req.query, ["sort_by", "sort_order", "limit", "page"]);

  const response = await categoryService.getPaginatedCategories(
    filters,
    options,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Categories fetched successfully",
    data: response,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const response = await categoryService.updateCategory(id, data);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Category updated successfully",
    data: response,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;

  const response = await categoryService.deleteCategory(id);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Category deleted successfully",
    data: response,
  });
});

export const categoryController = {
  createCategory,
  getCaegoryById,
  getPaginatedCategories,
  updateCategory,
  deleteCategory,
};
