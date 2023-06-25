"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Buyers = new Schema({
    idPreduzeca: {
        type: Number
    },
    narucioci: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('Buyers', Buyers, 'buyers');
//# sourceMappingURL=buyers.js.map