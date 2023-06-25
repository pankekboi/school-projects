"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyersController = void 0;
const buyers_1 = __importDefault(require("../models/buyers"));
class BuyersController {
    constructor() {
        this.getAllBuyers = (req, res) => {
            let id = req.body.id;
            buyers_1.default.findOne({ 'idPreduzeca': id }, (err, buyers) => {
                if (err)
                    console.log(err);
                else
                    res.json(buyers);
            });
        };
        this.addBuyer = (req, res) => {
            let idPreduzeca = req.body.id;
            let pib = req.body.pib;
            let brojDanaZaPlacanje = req.body.brojDanaZaPlacanje;
            let rabat = req.body.rabat;
            buyers_1.default.findOne({ 'idPreduzeca': idPreduzeca }, (err, buyers) => {
                if (err)
                    console.log(err);
                else if (buyers) {
                    let narucioci = {
                        'pib': pib,
                        'brojDanaZaPlacanje': brojDanaZaPlacanje,
                        'rabat': rabat
                    };
                    buyers_1.default.collection.updateOne({ 'idPreduzeca': parseInt(idPreduzeca) }, { $push: { 'narucioci': narucioci } }, (err, r) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'ok' });
                    });
                }
                else {
                    let newBuyers = new buyers_1.default({
                        idPreduzeca: idPreduzeca,
                        narucioci: [
                            {
                                'pib': pib,
                                'brojDanaZaPlacanje': brojDanaZaPlacanje,
                                'rabat': rabat
                            }
                        ]
                    });
                    newBuyers.save().then(buyer => {
                        res.status(200).json({ 'message': 'ok' });
                    }).catch(err => {
                        console.log(err);
                    });
                }
            });
        };
    }
}
exports.BuyersController = BuyersController;
//# sourceMappingURL=buyers.controller.js.map