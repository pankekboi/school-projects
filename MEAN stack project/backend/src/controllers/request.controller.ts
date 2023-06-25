import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import Enterprise from '../models/enterprise';
import EnterpriseRequest from '../models/enterpriseRequest';

export class RequestController{
    deleteRequest = (req: express.Request, res: express.Response)=>{
        let id = new mongoose.Types.ObjectId(req.body.id);

        EnterpriseRequest.deleteOne({'_id':id}, (err, r)=>{
            if(err) console.log(err)
            else res.json({'message':'ok'})
        })
    }

    approveRequest = (req: express.Request, res: express.Response)=>{
        let id = new mongoose.Types.ObjectId(req.body.id);

        EnterpriseRequest.findOne({'_id':id}, (err, request)=>{
            if(err) console.log(err)
            else if(request){
                User.find({}, (err, users)=>{
                    if(err) console.log(err)
                    else{
                        let noviId = 1;

                        if(users.length>0){
                            users.sort((a,b)=>{
                                if(a.id<b.id){
                                  return 1;
                                } else {
                                  if(a.id==b.id){
                                    return 0;
                                  }
                                  else {
                                    return -1;
                                  }
                                }
                            })

                            noviId = users[0].id + 1;
                        }

                        let enterprise = new Enterprise({
                            id: noviId,
                            ime: request.ime,
                            prezime: request.prezime,
                            username: request.username,
                            password: request.password,
                            telefon: request.telefon,
                            email: request.email,
                            nazivPreduzeca: request.nazivPreduzeca,
                            adresaPreduzeca: request.adresaPreduzeca,
                            pib: request.pib,
                            maticniBroj: request.maticniBroj,
                            logo: request.logo,
                            status: "Aktivan",
                            kategorija: "",
                            sifreDelatnosti: "",
                            uPDVsistemu: false,
                            ziroRacuni: "",
                            magacini: [],
                            kase: []
                        })
                        
                        enterprise.save().then(request=>{}).catch(err=>{
                            console.log(err)
                        })

                        let user = new User({
                            id: noviId,
                            username: request.username,
                            password: request.password,
                            tip: 2
                        })

                        user.save().then(user=>{}).catch(err=>{
                            console.log(err)
                        })

                        EnterpriseRequest.deleteOne({'_id':id}, (err, r)=>{
                            if(err) console.log(err)
                            else res.json({'message':'ok'})
                        })
                    }
                })
            }
        })
    }
}