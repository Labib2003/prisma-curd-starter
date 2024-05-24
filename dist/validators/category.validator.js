"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidator = void 0;
const zod_1 = require("zod");
const createCategory = zod_1.z.object({
    body: zod_1.z.strictObject({
        name: zod_1.z.string().min(1, { message: "Name is required" }),
    }),
});
exports.categoryValidator = {
    createCategory,
};
