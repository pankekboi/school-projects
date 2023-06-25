"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const buyers_controller_1 = require("../controllers/buyers.controller");
const buyersRouter = express_1.default.Router();
buyersRouter.route('/getAllBuyers').post((req, res) => new buyers_controller_1.BuyersController().getAllBuyers(req, res));
buyersRouter.route('/addBuyer').post((req, res) => new buyers_controller_1.BuyersController().addBuyer(req, res));
exports.default = buyersRouter;
//# sourceMappingURL=buyers.routes.js.map