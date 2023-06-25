import express from 'express';
import Buyers from '../models/buyers';

export class BuyersController{
    getAllBuyers = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;

        Buyers.findOne({'idPreduzeca':id}, (err, buyers)=>{
            if(err) console.log(err)
            else res.json(buyers);
        })
    }

    addBuyer = (req: express.Request, res: express.Response)=>{
        let idPreduzeca = req.body.id;
        let pib = req.body.pib;
        let brojDanaZaPlacanje = req.body.brojDanaZaPlacanje;
        let rabat = req.body.rabat;

        Buyers.findOne({'idPreduzeca':idPreduzeca}, (err, buyers)=>{
            if(err) console.log(err)
            else if(buyers){
                let narucioci = {
                    'pib':pib,
                    'brojDanaZaPlacanje':brojDanaZaPlacanje,
                    'rabat':rabat
                }

                Buyers.collection.updateOne({'idPreduzeca':parseInt(idPreduzeca)}, {$push: {'narucioci': narucioci}}, (err, r)=>{
                    if(err) console.log(err)
                    else res.json({'message':'ok'})
                })
            } else {
                let newBuyers = new Buyers({
                    idPreduzeca: idPreduzeca,
                    narucioci: [
                        {
                            'pib': pib,
                            'brojDanaZaPlacanje': brojDanaZaPlacanje,
                            'rabat': rabat
                        }
                    ]
                })

                newBuyers.save().then(buyer=>{
                    res.status(200).json({'message':'ok'});
                }).catch(err=>{
                    console.log(err)
                })
            }
        })
    }
}