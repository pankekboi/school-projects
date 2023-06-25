import express from 'express';
import Receipt from '../models/receipt';
import ReceiptsCash from '../models/receiptsCash';
import ReceiptsCheck from '../models/receiptsCheck';
import ReceiptsCard from '../models/receiptsCard';
import ReceiptsVirman from '../models/receiptsVirman';
import DailyReport from '../models/dailyReport';

export class ReceiptController{
    getAllReceipts = (req: express.Request, res: express.Response)=>{
        Receipt.find({}, (err, receipts)=>{
            if(err) console.log(err);
            else res.json(receipts);
        })
    }

    getAllReceiptsToday = (req: express.Request, res: express.Response)=>{
        let datum: Date = new Date(req.body.datum);
        let nazivPreduzeca = req.body.nazivPreduzeca;
        let danasnjiRacuni = [];

        Receipt.find({'naziv':nazivPreduzeca}, (err, receipts)=>{
            if(err) console.log(err)
            else if(receipts){
                for(let index = 0; index < receipts.length; index++){
                    if(datum.getFullYear() == receipts[index].datum.getFullYear() && datum.getMonth() == receipts[index].datum.getMonth() && datum.getDate() == receipts[index].datum.getDate()){
                        danasnjiRacuni.push(receipts[index]);
                    }
                }

                res.json(danasnjiRacuni);
            }
        })
    }

    getAllReceiptsDate = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        let pib = req.body.pib;
        let datumPocetka = new Date(req.body.datumPocetka);
        let datumKraja = new Date(req.body.datumKraja);

        let izvestaji = [];

        DailyReport.find({}, (err, reports)=>{
            if(err) console.log(err)
            else {
                izvestaji = reports.filter(report=> report.naziv.includes(naziv) && report.pib.includes(pib) && report.datum>=datumPocetka && report.datum<=datumKraja);

                res.json(izvestaji);
            }
        })
    }

    getAllReceiptsForCustomer = (req: express.Request, res: express.Response)=>{
        let brojLK = req.body.brojLK;

        let racuni = [];
        let mojiRacuni = [];
        let racuniKes = [];
        let racuniKartica = [];
        let racuniCek = [];

        Receipt.find({'brojLK':brojLK}, (err, receipt)=>{
            if(err) console.log(err)
            else {
                racuni = receipt;

                ReceiptsCash.find({'brojLK':brojLK}, (err, receiptCash)=>{
                    if(err) console.log(err)
                    else{
                        racuniKes = receiptCash;

                        ReceiptsCard.find({'brojLK':brojLK}, (err, receiptCard)=>{
                            if(err) console.log(err)
                            else{
                                racuniKartica = receiptCard;

                                ReceiptsCheck.find({'brojLK':brojLK}, (err, receiptCheck)=>{
                                    racuniCek = receiptCheck;

                                    racuni.forEach(racun => {
                                        racuniKes.forEach(kes=>{
                                            if(racun._id.equals(kes._id)){
                                                mojiRacuni.push(racun);
                                            }
                                        })

                                        racuniKartica.forEach(kartica=>{
                                            if(racun._id.equals(kartica._id)){
                                                mojiRacuni.push(racun);
                                            }
                                        })

                                        racuniCek.forEach(cek=>{
                                            if(racun._id.equals(cek._id)){
                                                mojiRacuni.push(racun);
                                            }
                                        })
                                    }); 
                                    
                                    res.json({'mojiRacuni':mojiRacuni, 'racuniKes':racuniKes, 'racuniKartica':racuniKartica, 'racuniCek':racuniCek});
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    addToDailyReport = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        let pib = req.body.pib;
        let datum = req.body.datum;
        let iznos = req.body.iznos;
        let pdv = req.body.pdv;

        iznos += pdv;

        DailyReport.findOne({'naziv':naziv, 'pib':pib, 'datum':datum}, (err, report)=>{
            if(report){
                let noviIznos = report.iznos + iznos;
                let noviPDV = report.pdv + pdv;

                DailyReport.updateOne({'naziv':naziv, 'pib':pib, 'datum':datum}, {$set: {'iznos':noviIznos, 'pdv':noviPDV}}, (err, r)=>{
                    if(err) console.log(err)
                    else res.json({'message':'ok'});
                })
            } else {
                let dailyReport = new DailyReport({
                    naziv: naziv,
                    pib: pib,
                    datum: datum,
                    iznos: iznos,
                    pdv: pdv
                })

                dailyReport.save().then(report=>{}).catch(err=>{
                    console.log(err)
                })

                res.json({'message':'ok'})
            }
        })
    }

    addReceiptCash = (req: express.Request, res: express.Response)=>{
        //let racun = new Receipt(req.body.racun);
        let r = req.body.racun;

        let racun = new Receipt({
            naziv: r.naziv,
            lokacija: r.lokacija,
            iznos: r.iznos,
            pdv: r.pdv,
            datum: r.datum,
            stavke: r.stavke,
            nacinPlacanja: r.nacinPlacanja
        })

        let placeno = req.body.placeno;
        let brojLK = req.body.brojLK;
        let kusur = req.body.kusur;

        racun.save().then(racun=>{}).catch(err=>{
            console.log(err)
            res.status(400).json({'message':'greska'})
        })

        let racunKes = new ReceiptsCash({
            _id: racun._id,
            placeno: placeno,
            brojLK: brojLK,
            kusur: kusur
        })

        racunKes.save().then(racun=>{}).catch(err=>{
            console.log(err)
            res.status(400).json({'message':'greska'})
        })

        res.status(200).json({'message':'ok'})
    }

    addReceiptCheck = (req: express.Request, res: express.Response)=>{
        //let racun = new Receipt(req.body.racun);

        let r = req.body.racun;

        let racun = new Receipt({
            naziv: r.naziv,
            lokacija: r.lokacija,
            iznos: r.iznos,
            pdv: r.pdv,
            datum: r.datum,
            stavke: r.stavke,
            nacinPlacanja: r.nacinPlacanja
        })

        let imeKupca = req.body.imeKupca;
        let prezimeKupca = req.body.prezimeKupca;
        let brojLK = req.body.brojLK;

        racun.save().then(racun=>{}).catch(err=>{
            console.log(err)
            res.status(400).json({'message':'greska'})
        })

        let racunCek = new ReceiptsCheck({
            _id: racun._id,
            imeKupca: imeKupca,
            prezimeKupca: prezimeKupca,
            brojLK: brojLK
        })

        racunCek.save().then(racun=>{}).catch(err=>{
            console.log(err)
            res.status(400).json({'message':'greska'})
        })

        res.status(200).json({'message':'ok'})
    }

    addReceiptCard = (req: express.Request, res: express.Response)=>{
        //let racun = new Receipt(req.body.racun);

        let r = req.body.racun;

        let racun = new Receipt({
            naziv: r.naziv,
            lokacija: r.lokacija,
            iznos: r.iznos,
            pdv: r.pdv,
            datum: r.datum,
            stavke: r.stavke,
            nacinPlacanja: r.nacinPlacanja
        })

        let brojLK = req.body.brojLK;
        let brojSlip = req.body.brojSlip;

        racun.save().then(racun=>{}).catch(err=>{
            console.log(err)
            res.status(400).json({'message':'greska'})
        })

        let racunKartica = new ReceiptsCard({
            _id: racun._id,
            brojLK: brojLK,
            brojSlip: brojSlip
        })

        racunKartica.save().then(racun=>{}).catch(err=>{
            console.log(err)
            res.status(400).json({'message':'greska'})
        })

        res.status(200).json({'message':'ok'})
    }

    addReceiptVirman = (req: express.Request, res: express.Response)=>{
        //let racun = new Receipt(req.body.racun);

        let r = req.body.racun;

        let racun = new Receipt({
            naziv: r.naziv,
            lokacija: r.lokacija,
            iznos: r.iznos,
            pdv: r.pdv,
            datum: r.datum,
            stavke: r.stavke,
            nacinPlacanja: r.nacinPlacanja
        })

        let narucioc = req.body.narucioc;

        racun.save().then(racun=>{}).catch(err=>{
            console.log(err)
            res.status(400).json({'message':'greska'})
        })

        let racunVirman = new ReceiptsVirman({
            narucioc: narucioc
        })

        racunVirman.save().then(racun=>{}).catch(err=>{
            console.log(err)
            res.status(400).json({'message':'greska'})
        })

        res.status(200).json({'message':'ok'})
    }
}