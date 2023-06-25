"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let ReceiptCash = new Schema({
    placeno: {
        type: Number
    },
    brojLK: {
        type: String
    },
    kusur: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('ReceiptCash', ReceiptCash, 'receiptsCash');
//# sourceMappingURL=receiptsCash.js.map