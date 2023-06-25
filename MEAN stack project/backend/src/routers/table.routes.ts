import express from 'express';
import { TableController } from '../controllers/table.controller';

const tableRouter = express.Router();

tableRouter.route('/getAllLocations').post(
    (req, res)=> new TableController().getAllLocations(req, res)
)

tableRouter.route('/addLocation').post(
    (req, res)=>new TableController().addLocation(req, res)
)

export default tableRouter;