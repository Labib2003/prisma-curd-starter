import { Router } from "express";
import { categoryController } from "../controllers/category.controller";
import validateRequest from "../middleware/validateRequest";
import { categoryValidator } from "../validators/category.validator";

const categoryRouter = Router();

categoryRouter
  .route("/")
  .post(
    validateRequest(categoryValidator.createCategory),
    categoryController.createCategory,
  )
  .get(categoryController.getPaginatedCategories);

categoryRouter
  .route("/:id")
  .get(categoryController.getCaegoryById)
  .patch(
    validateRequest(categoryValidator.updateCategory),
    categoryController.updateCategory,
  )
  .delete(categoryController.deleteCategory);

export default categoryRouter;
