"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const categories_1 = __importDefault(require("../models/categories"));
class CategoriesController {
    constructor() {
        this.getAllCategories = (req, res) => {
            let id = req.body.id;
            categories_1.default.findOne({ 'idPreduzeca': id }, (err, cats) => {
                if (err)
                    console.log(err);
                else
                    res.json(cats);
            });
        };
        this.addCategory = (req, res) => {
            let id = req.body.id;
            let naziv = req.body.naziv;
            let kategorija = {
                naziv: naziv,
                artikli: []
            };
            categories_1.default.findOne({ 'idPreduzeca': id }, (err, cat) => {
                if (err)
                    console.log(err);
                else if (cat) {
                    categories_1.default.updateOne({ 'idPreduzeca': id }, { $push: { 'kategorije': kategorija } }, (err, r) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'ok' });
                    });
                }
                else {
                    let kategorije = new categories_1.default({
                        idPreduzeca: id,
                        kategorije: [kategorija]
                    });
                    kategorije.save().then(request => {
                        res.status(200).json({ 'message': 'ok' });
                    }).catch(err => {
                        res.status(400).json({ 'message': 'greska' });
                    });
                }
            });
        };
        this.addItemToCategory = (req, res) => {
            let id = req.body.id;
            let naziv = req.body.naziv;
            let artikal = req.body.artikal;
            categories_1.default.findOne({ 'idPreduzeca': id }, (err, cat) => {
                let kategorije = cat.kategorije;
                for (let index = 0; index < kategorije.length; index++) {
                    for (let index2 = 0; index2 < kategorije[index].artikli.length; index2++) {
                        if (artikal.sifra == kategorije[index].artikli[index2].sifra) {
                            res.json({ 'message': 'postoji artikal u kategoriji', 'kategorija': kategorije[index].naziv });
                            return;
                        }
                    }
                }
                for (let index = 0; index < kategorije.length; index++) {
                    if (kategorije[index].naziv == naziv) {
                        kategorije[index].artikli.push(artikal);
                        break;
                    }
                }
                categories_1.default.updateOne({ 'idPreduzeca': id }, { $set: { 'kategorije': kategorije } }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ 'message': 'ok' });
                    }
                });
            });
        };
    }
}
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map