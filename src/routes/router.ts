import { Router } from "express";
import categoryRouter from "./category.router";

const appRouter = Router();

const routes = [{ route: "/categories", router: categoryRouter }];

routes.forEach((route) => appRouter.use(route.route, route.router));

export default appRouter;
