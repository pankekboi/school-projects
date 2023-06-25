"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let ReceiptCheck = new Schema({
    imeKupca: {
        type: String
    },
    prezimeKupca: {
        type: String
    },
    brojLK: {
        type: String
    }
});
exports.default = mongoose_1.default.model('ReceiptCheck', ReceiptCheck, 'receiptsCheck');
//# sourceMappingURL=receiptsCheck.js.map