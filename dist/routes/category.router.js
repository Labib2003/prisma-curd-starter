"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const validateRequest_1 = __importDefault(require("../middleware/validateRequest"));
const category_validator_1 = require("../validators/category.validator");
const categoryRouter = (0, express_1.Router)();
categoryRouter
    .route("/")
    .post((0, validateRequest_1.default)(category_validator_1.categoryValidator.createCategory), category_controller_1.categoryController.createCategory);
exports.default = categoryRouter;
