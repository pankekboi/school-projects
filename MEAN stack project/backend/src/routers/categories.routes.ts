import express from 'express';
import { CategoriesController } from '../controllers/categories.controller';

const categoriesRouter = express.Router();

categoriesRouter.route('/getAllCategories').post(
    (req, res)=> new CategoriesController().getAllCategories(req, res)
)

categoriesRouter.route('/addCategory').post(
    (req, res)=> new CategoriesController().addCategory(req, res)
)

categoriesRouter.route('/addItemToCategory').post(
    (req, res)=> new CategoriesController().addItemToCategory(req, res)
)

export default categoriesRouter;