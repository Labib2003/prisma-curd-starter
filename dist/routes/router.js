"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_router_1 = __importDefault(require("./category.router"));
const appRouter = (0, express_1.Router)();
const routes = [{ route: "/categories", router: category_router_1.default }];
routes.forEach((route) => appRouter.use(route.route, route.router));
exports.default = appRouter;
