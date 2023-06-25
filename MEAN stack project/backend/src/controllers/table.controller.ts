import express from 'express';
import TableArangements from '../models/tableArangements';

export class TableController{
    getAllLocations = (req: express.Request, res: express.Response)=>{
        let idPreduzeca = req.body.idPreduzeca;

        TableArangements.findOne({'idPreduzeca':idPreduzeca}, (err, tb)=>{
            if(err) console.log(err)
            else res.json(tb)
        })
    }

    addLocation = (req: express.Request, res: express.Response)=>{
        let idPreduzeca = req.body.idPreduzeca;
        let lokacija = req.body.lokacija;

        TableArangements.findOne({'idPreduzeca':idPreduzeca}, (err, tb)=>{
            if(err) console.log(err)
            else if(tb){
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
                }

                let objekti = tb.objekti;
                objekti.push(data);

                TableArangements.updateOne({'idPreduzeca':idPreduzeca}, {$set: {'objekti':objekti}}, (err, r)=>{
                    if(err) console.log(err)
                    else res.json({'message':'ok'})
                })
            } else {
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
                }

                let tableArangements = new TableArangements(data);

                tableArangements.save().then(arangement=>{}).catch(err=>{
                    console.log(err)
                })

                res.json({'message':'ok'})
            }
        })
    }
}