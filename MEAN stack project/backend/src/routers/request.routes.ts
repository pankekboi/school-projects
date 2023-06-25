import express from 'express';
import { RequestController } from '../controllers/request.controller';

const requestRouter = express.Router();

requestRouter.route('/deleteRequest').post(
    (req, res)=>new RequestController().deleteRequest(req, res)
)

requestRouter.route('/approveRequest').post(
    (req, res)=> new RequestController().approveRequest(req, res)
)

export default requestRouter;