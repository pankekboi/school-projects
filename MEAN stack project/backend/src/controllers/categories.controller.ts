import express from 'express';
import Categories from '../models/categories';

export class CategoriesController{
    getAllCategories = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;

        Categories.findOne({'idPreduzeca':id}, (err, cats)=>{
            if(err) console.log(err)
            else res.json(cats)
        })
    }

    addCategory = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let naziv = req.body.naziv;

        let kategorija = {
            naziv: naziv,
            artikli: []
        }

        Categories.findOne({'idPreduzeca':id}, (err, cat)=>{
            if(err) console.log(err)
            else if (cat){
                Categories.updateOne({'idPreduzeca':id}, {$push: {'kategorije':kategorija}}, (err, r)=>{
                    if(err) console.log(err)
                    else res.json({'message': 'ok'})
                })
            } else {
                let kategorije = new Categories({
                    idPreduzeca: id,
                    kategorije: [kategorija]
                })

                kategorije.save().then(request=>{
                    res.status(200).json({'message': 'ok'})
                }).catch(err=>{
                    res.status(400).json({'message': 'greska'})
                })
            }
        }) 
    }

    addItemToCategory = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let naziv = req.body.naziv;
        let artikal = req.body.artikal;

        Categories.findOne({'idPreduzeca':id}, (err, cat)=>{
            let kategorije = cat.kategorije;

            for (let index = 0; index < kategorije.length; index++) {
                for(let index2 = 0; index2 < kategorije[index].artikli.length; index2++){
                    if(artikal.sifra==kategorije[index].artikli[index2].sifra){
                        res.json({'message':'postoji artikal u kategoriji', 'kategorija':kategorije[index].naziv});
                        return;
                    }
                }
            }

            for (let index = 0; index < kategorije.length; index++) {
                if(kategorije[index].naziv==naziv){
                    kategorije[index].artikli.push(artikal);
                    break;
                }
            }

            Categories.updateOne({'idPreduzeca':id}, {$set: {'kategorije':kategorije}}, (err, r)=>{
                if(err) console.log(err)
                else{
                    res.json({'message':'ok'})
                }
            })
        })
    }
}