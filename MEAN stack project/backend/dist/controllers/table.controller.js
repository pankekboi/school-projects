"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableController = void 0;
const tableArangements_1 = __importDefault(require("../models/tableArangements"));
class TableController {
    constructor() {
        this.getAllLocations = (req, res) => {
            let idPreduzeca = req.body.idPreduzeca;
            tableArangements_1.default.findOne({ 'idPreduzeca': idPreduzeca }, (err, tb) => {
                if (err)
                    console.log(err);
                else
                    res.json(tb);
            });
        };
        this.addLocation = (req, res) => {
            let idPreduzeca = req.body.idPreduzeca;
            let lokacija = req.body.lokacija;
            tableArangements_1.default.findOne({ 'idPreduzeca': idPreduzeca }, (err, tb) => {
                if (err)
                    console.log(err);
                else if (tb) {
                    let data = {
                        lokacija: lokacija,
                        stolovi: [
                            {
                                idStola: 1,
                                zauzet: false
                            },
                            {
                                idStola: 2,
                                zauzet: false
                            },
                            {
                                idStola: 3,
                                zauzet: false
                            },
                            {
                                idStola: 4,
                                zauzet: false
                            }
                        ]
                    };
                    let objekti = tb.objekti;
                    objekti.push(data);
                    tableArangements_1.default.updateOne({ 'idPreduzeca': idPreduzeca }, { $set: { 'objekti': objekti } }, (err, r) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'ok' });
                    });
                }
                else {
                    let data = {
                        idPreduzeca: idPreduzeca,
                        objekti: [
                            {
                                lokacija: lokacija,
                                stolovi: [
                                    {
                                        idStola: 1,
                                        zauzet: false
                                    },
                                    {
                                        idStola: 2,
                                        zauzet: false
                                    },
                                    {
                                        idStola: 3,
                                        zauzet: false
                                    },
                                    {
                                        idStola: 4,
                                        zauzet: false
                                    }
                                ]
                            }
                        ]
                    };
                    let tableArangements = new tableArangements_1.default(data);
                    tableArangements.save().then(arangement => { }).catch(err => {
                        console.log(err);
                    });
                    res.json({ 'message': 'ok' });
                }
            });
        };
    }
}
exports.TableController = TableController;
//# sourceMappingURL=table.controller.js.map