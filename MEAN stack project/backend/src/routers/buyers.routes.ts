import express from 'express';
import { BuyersController } from '../controllers/buyers.controller';

const buyersRouter = express.Router();

buyersRouter.route('/getAllBuyers').post(
    (req, res)=> new BuyersController().getAllBuyers(req, res)
)

buyersRouter.route('/addBuyer').post(
    (req, res)=> new BuyersController().addBuyer(req, res)
)

export default buyersRouter;