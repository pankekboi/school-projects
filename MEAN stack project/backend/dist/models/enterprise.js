"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Enterprise = new Schema({
    id: {
        type: Number
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    telefon: {
        type: String
    },
    email: {
        type: String
    },
    nazivPreduzeca: {
        type: String
    },
    adresaPreduzeca: {
        type: String
    },
    pib: {
        type: String
    },
    maticniBroj: {
        type: String
    },
    logo: {
        type: String
    },
    status: {
        type: String
    },
    kategorija: {
        type: String
    },
    sifreDelatnosti: {
        type: String
    },
    uPDVsistemu: {
        type: Boolean
    },
    ziroRacuni: {
        type: String
    },
    magacini: {
        type: Array
    },
    kase: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('Enterprise', Enterprise, 'enterprises');
//# sourceMappingURL=enterprise.js.map