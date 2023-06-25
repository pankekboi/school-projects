"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Receipt = new Schema({
    naziv: {
        type: String
    },
    lokacija: {
        type: String
    },
    iznos: {
        type: Number
    },
    pdv: {
        type: Number
    },
    datum: {
        type: Date
    },
    stavke: {
        type: Array
    },
    nacinPlacanja: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Receipt', Receipt, 'receipts');
//# sourceMappingURL=receipt.js.map