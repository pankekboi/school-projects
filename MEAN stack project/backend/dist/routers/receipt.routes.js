"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const receipt_controller_1 = require("../controllers/receipt.controller");
const receiptRouter = express_1.default.Router();
receiptRouter.route('/getAllReceipts').get((req, res) => new receipt_controller_1.ReceiptController().getAllReceipts(req, res));
receiptRouter.route('/addReceiptCash').post((req, res) => new receipt_controller_1.ReceiptController().addReceiptCash(req, res));
receiptRouter.route('/addReceiptCheck').post((req, res) => new receipt_controller_1.ReceiptController().addReceiptCheck(req, res));
receiptRouter.route('/addReceiptCard').post((req, res) => new receipt_controller_1.ReceiptController().addReceiptCard(req, res));
receiptRouter.route('/addReceiptVirman').post((req, res) => new receipt_controller_1.ReceiptController().addReceiptVirman(req, res));
receiptRouter.route('/getAllReceiptsToday').post((req, res) => new receipt_controller_1.ReceiptController().getAllReceiptsToday(req, res));
receiptRouter.route('/getAllReceiptsDate').post((req, res) => new receipt_controller_1.ReceiptController().getAllReceiptsDate(req, res));
receiptRouter.route('/getAllReceiptsForCustomer').post((req, res) => new receipt_controller_1.ReceiptController().getAllReceiptsForCustomer(req, res));
receiptRouter.route('/addToDailyReport').post((req, res) => new receipt_controller_1.ReceiptController().addToDailyReport(req, res));
exports.default = receiptRouter;
//# sourceMappingURL=receipt.routes.js.map