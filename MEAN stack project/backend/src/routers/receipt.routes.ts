import express from 'express';
import { ReceiptController } from '../controllers/receipt.controller';

const receiptRouter = express.Router();

receiptRouter.route('/getAllReceipts').get(
    (req, res)=> new ReceiptController().getAllReceipts(req, res)
)

receiptRouter.route('/addReceiptCash').post(
    (req, res)=> new ReceiptController().addReceiptCash(req, res)
)

receiptRouter.route('/addReceiptCheck').post(
    (req, res)=>new ReceiptController().addReceiptCheck(req, res)
)

receiptRouter.route('/addReceiptCard').post(
    (req, res)=>new ReceiptController().addReceiptCard(req, res)
)

receiptRouter.route('/addReceiptVirman').post(
    (req, res)=>new ReceiptController().addReceiptVirman(req, res)
)

receiptRouter.route('/getAllReceiptsToday').post(
    (req, res)=> new ReceiptController().getAllReceiptsToday(req, res)
)

receiptRouter.route('/getAllReceiptsDate').post(
    (req, res)=>new ReceiptController().getAllReceiptsDate(req, res)
)

receiptRouter.route('/getAllReceiptsForCustomer').post(
    (req, res)=>new ReceiptController().getAllReceiptsForCustomer(req, res)
)

receiptRouter.route('/addToDailyReport').post(
    (req, res)=>new ReceiptController().addToDailyReport(req, res)
)

export default receiptRouter;