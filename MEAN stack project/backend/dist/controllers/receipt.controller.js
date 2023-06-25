"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptController = void 0;
const receipt_1 = __importDefault(require("../models/receipt"));
const receiptsCash_1 = __importDefault(require("../models/receiptsCash"));
const receiptsCheck_1 = __importDefault(require("../models/receiptsCheck"));
const receiptsCard_1 = __importDefault(require("../models/receiptsCard"));
const receiptsVirman_1 = __importDefault(require("../models/receiptsVirman"));
const dailyReport_1 = __importDefault(require("../models/dailyReport"));
class ReceiptController {
    constructor() {
        this.getAllReceipts = (req, res) => {
            receipt_1.default.find({}, (err, receipts) => {
                if (err)
                    console.log(err);
                else
                    res.json(receipts);
            });
        };
        this.getAllReceiptsToday = (req, res) => {
            let datum = new Date(req.body.datum);
            let nazivPreduzeca = req.body.nazivPreduzeca;
            let danasnjiRacuni = [];
            receipt_1.default.find({ 'naziv': nazivPreduzeca }, (err, receipts) => {
                if (err)
                    console.log(err);
                else if (receipts) {
                    for (let index = 0; index < receipts.length; index++) {
                        if (datum.getFullYear() == receipts[index].datum.getFullYear() && datum.getMonth() == receipts[index].datum.getMonth() && datum.getDate() == receipts[index].datum.getDate()) {
                            danasnjiRacuni.push(receipts[index]);
                        }
                    }
                    res.json(danasnjiRacuni);
                }
            });
        };
        this.getAllReceiptsDate = (req, res) => {
            let naziv = req.body.naziv;
            let pib = req.body.pib;
            let datumPocetka = new Date(req.body.datumPocetka);
            let datumKraja = new Date(req.body.datumKraja);
            let izvestaji = [];
            dailyReport_1.default.find({}, (err, reports) => {
                if (err)
                    console.log(err);
                else {
                    izvestaji = reports.filter(report => report.naziv.includes(naziv) && report.pib.includes(pib) && report.datum >= datumPocetka && report.datum <= datumKraja);
                    res.json(izvestaji);
                }
            });
        };
        this.getAllReceiptsForCustomer = (req, res) => {
            let brojLK = req.body.brojLK;
            let racuni = [];
            let mojiRacuni = [];
            let racuniKes = [];
            let racuniKartica = [];
            let racuniCek = [];
            receipt_1.default.find({ 'brojLK': brojLK }, (err, receipt) => {
                if (err)
                    console.log(err);
                else {
                    racuni = receipt;
                    receiptsCash_1.default.find({ 'brojLK': brojLK }, (err, receiptCash) => {
                        if (err)
                            console.log(err);
                        else {
                            racuniKes = receiptCash;
                            receiptsCard_1.default.find({ 'brojLK': brojLK }, (err, receiptCard) => {
                                if (err)
                                    console.log(err);
                                else {
                                    racuniKartica = receiptCard;
                                    receiptsCheck_1.default.find({ 'brojLK': brojLK }, (err, receiptCheck) => {
                                        racuniCek = receiptCheck;
                                        racuni.forEach(racun => {
                                            racuniKes.forEach(kes => {
                                                if (racun._id.equals(kes._id)) {
                                                    mojiRacuni.push(racun);
                                                }
                                            });
                                            racuniKartica.forEach(kartica => {
                                                if (racun._id.equals(kartica._id)) {
                                                    mojiRacuni.push(racun);
                                                }
                                            });
                                            racuniCek.forEach(cek => {
                                                if (racun._id.equals(cek._id)) {
                                                    mojiRacuni.push(racun);
                                                }
                                            });
                                        });
                                        res.json({ 'mojiRacuni': mojiRacuni, 'racuniKes': racuniKes, 'racuniKartica': racuniKartica, 'racuniCek': racuniCek });
                                    });
                                }
                            });
                        }
                    });
                }
            });
        };
        this.addToDailyReport = (req, res) => {
            let naziv = req.body.naziv;
            let pib = req.body.pib;
            let datum = req.body.datum;
            let iznos = req.body.iznos;
            let pdv = req.body.pdv;
            iznos += pdv;
            dailyReport_1.default.findOne({ 'naziv': naziv, 'pib': pib, 'datum': datum }, (err, report) => {
                if (report) {
                    let noviIznos = report.iznos + iznos;
                    let noviPDV = report.pdv + pdv;
                    dailyReport_1.default.updateOne({ 'naziv': naziv, 'pib': pib, 'datum': datum }, { $set: { 'iznos': noviIznos, 'pdv': noviPDV } }, (err, r) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': 'ok' });
                    });
                }
                else {
                    let dailyReport = new dailyReport_1.default({
                        naziv: naziv,
                        pib: pib,
                        datum: datum,
                        iznos: iznos,
                        pdv: pdv
                    });
                    dailyReport.save().then(report => { }).catch(err => {
                        console.log(err);
                    });
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.addReceiptCash = (req, res) => {
            //let racun = new Receipt(req.body.racun);
            let r = req.body.racun;
            let racun = new receipt_1.default({
                naziv: r.naziv,
                lokacija: r.lokacija,
                iznos: r.iznos,
                pdv: r.pdv,
                datum: r.datum,
                stavke: r.stavke,
                nacinPlacanja: r.nacinPlacanja
            });
            let placeno = req.body.placeno;
            let brojLK = req.body.brojLK;
            let kusur = req.body.kusur;
            racun.save().then(racun => { }).catch(err => {
                console.log(err);
                res.status(400).json({ 'message': 'greska' });
            });
            let racunKes = new receiptsCash_1.default({
                _id: racun._id,
                placeno: placeno,
                brojLK: brojLK,
                kusur: kusur
            });
            racunKes.save().then(racun => { }).catch(err => {
                console.log(err);
                res.status(400).json({ 'message': 'greska' });
            });
            res.status(200).json({ 'message': 'ok' });
        };
        this.addReceiptCheck = (req, res) => {
            //let racun = new Receipt(req.body.racun);
            let r = req.body.racun;
            let racun = new receipt_1.default({
                naziv: r.naziv,
                lokacija: r.lokacija,
                iznos: r.iznos,
                pdv: r.pdv,
                datum: r.datum,
                stavke: r.stavke,
                nacinPlacanja: r.nacinPlacanja
            });
            let imeKupca = req.body.imeKupca;
            let prezimeKupca = req.body.prezimeKupca;
            let brojLK = req.body.brojLK;
            racun.save().then(racun => { }).catch(err => {
                console.log(err);
                res.status(400).json({ 'message': 'greska' });
            });
            let racunCek = new receiptsCheck_1.default({
                _id: racun._id,
                imeKupca: imeKupca,
                prezimeKupca: prezimeKupca,
                brojLK: brojLK
            });
            racunCek.save().then(racun => { }).catch(err => {
                console.log(err);
                res.status(400).json({ 'message': 'greska' });
            });
            res.status(200).json({ 'message': 'ok' });
        };
        this.addReceiptCard = (req, res) => {
            //let racun = new Receipt(req.body.racun);
            let r = req.body.racun;
            let racun = new receipt_1.default({
                naziv: r.naziv,
                lokacija: r.lokacija,
                iznos: r.iznos,
                pdv: r.pdv,
                datum: r.datum,
                stavke: r.stavke,
                nacinPlacanja: r.nacinPlacanja
            });
            let brojLK = req.body.brojLK;
            let brojSlip = req.body.brojSlip;
            racun.save().then(racun => { }).catch(err => {
                console.log(err);
                res.status(400).json({ 'message': 'greska' });
            });
            let racunKartica = new receiptsCard_1.default({
                _id: racun._id,
                brojLK: brojLK,
                brojSlip: brojSlip
            });
            racunKartica.save().then(racun => { }).catch(err => {
                console.log(err);
                res.status(400).json({ 'message': 'greska' });
            });
            res.status(200).json({ 'message': 'ok' });
        };
        this.addReceiptVirman = (req, res) => {
            //let racun = new Receipt(req.body.racun);
            let r = req.body.racun;
            let racun = new receipt_1.default({
                naziv: r.naziv,
                lokacija: r.lokacija,
                iznos: r.iznos,
                pdv: r.pdv,
                datum: r.datum,
                stavke: r.stavke,
                nacinPlacanja: r.nacinPlacanja
            });
            let narucioc = req.body.narucioc;
            racun.save().then(racun => { }).catch(err => {
                console.log(err);
                res.status(400).json({ 'message': 'greska' });
            });
            let racunVirman = new receiptsVirman_1.default({
                narucioc: narucioc
            });
            racunVirman.save().then(racun => { }).catch(err => {
                console.log(err);
                res.status(400).json({ 'message': 'greska' });
            });
            res.status(200).json({ 'message': 'ok' });
        };
    }
}
exports.ReceiptController = ReceiptController;
//# sourceMappingURL=receipt.controller.js.map