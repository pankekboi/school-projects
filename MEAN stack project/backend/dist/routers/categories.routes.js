"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_controller_1 = require("../controllers/categories.controller");
const categoriesRouter = express_1.default.Router();
categoriesRouter.route('/getAllCategories').post((req, res) => new categories_controller_1.CategoriesController().getAllCategories(req, res));
categoriesRouter.route('/addCategory').post((req, res) => new categories_controller_1.CategoriesController().addCategory(req, res));
categoriesRouter.route('/addItemToCategory').post((req, res) => new categories_controller_1.CategoriesController().addItemToCategory(req, res));
exports.default = categoriesRouter;
//# sourceMappingURL=categories.routes.js.map