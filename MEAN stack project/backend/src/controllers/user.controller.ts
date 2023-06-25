import express, { response } from 'express';
import User from '../models/user';
import EnterpriseRequest from '../models/enterpriseRequest';
import Enterprise from '../models/enterprise';
import multipary from 'multiparty';
import Customer from '../models/customer';
import EnterpriseItem from '../models/enterpriseItem';

export class UserController{
    getUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({'username':username, 'password':password}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    addCustomer = (req: express.Request, res: express.Response)=>{
        let noviId = 1;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let username = req.body.username;
        let password = req.body.password;
        let telefon = req.body.telefon;
        let brojLK = req.body.brojLK;

        User.find({}, (err, users)=>{
            if(err) console.log(err)
            else{
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

                let user = new User({
                    id: noviId,
                    username: username,
                    password: password,
                    tip: 1
                })

                user.save().then(user=>{}).catch(err=>{
                    console.log(err)
                })

                let customer = new Customer({
                    id: noviId,
                    ime: ime,
                    prezime: prezime,
                    username: username,
                    password: password,
                    telefon: telefon,
                    brojLK: brojLK
                })

                customer.save().then(customer=>{}).catch(err=>{
                    console.log(err)
                })

                res.json({'message':'ok'})
            }
        })
    }

    addEnterprise = (req: express.Request, res: express.Response)=>{
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
                    ime: req.body.ime,
                    prezime: req.body.prezime,
                    username: req.body.username,
                    password: req.body.password,
                    telefon: req.body.telefon,
                    email: req.body.email,
                    nazivPreduzeca: req.body.nazivPreduzeca,
                    adresaPreduzeca: req.body.adresaPreduzeca,
                    pib: req.body.pib,
                    maticniBroj: req.body.maticniBroj,
                    logo: req.body.logo,
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
                    username: req.body.username,
                    password: req.body.password,
                    tip: 2
                })

                user.save().then(user=>{}).catch(err=>{
                    console.log(err)
                })

                res.json({'message':'ok'})
            }
        })
    }

    checkUsername = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        User.findOne({'username':username}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    checkEmail = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;

        EnterpriseRequest.findOne({'email':email}, (err, r)=>{
            if(err) console.log(err);
            else {
                Enterprise.findOne({'email':email}, (err, e)=>{
                    if(err) console.log(err);
                    else {
                        res.json({'request':r, 'enterprise':e});
                    }
                })
            }
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        let form = new multipary.Form();
        form.parse(req, function(err, fields, files){
            let request = new EnterpriseRequest({
                ime: String(fields.name),
                prezime: String(fields.lastname),
                username: String(fields.username),
                password: String(fields.password),
                telefon: String(fields.phone),
                email: String(fields.email),
                nazivPreduzeca: String(fields.enterpriseName),
                adresaPreduzeca: String(fields.hqAddr),
                pib: String(fields.pib),
                maticniBroj: String(fields.hqNumber),
                logo: String(fields.logo),
                status: "Neaktivan"
            })

            request.save().then(request=>{
                res.status(200).json({'message':'Zahtev za registraciju je uspesno poslat!'});
            }).catch(err=>{
                console.log(err)
                res.status(400).json({'message':'Dogodila se greska prilikom kreiranja zahteva za registraciju.'});
            })
        })
    }

    getEnterpriseById = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;

        Enterprise.findOne({'id':id}, (err, ent)=>{
            if(err) console.log(err);
            else res.json(ent);
        })
    }

    getEnterprise = (req: express.Request, res: express.Response)=>{
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let username = req.body.username;
        let telefon = req.body.telefon;
        let email = req.body.email;
        let nazivPreduzeca = req.body.nazivPreduzeca;
        let adresaPreduzeca = req.body.adresaPreduzeca;
        let pib = req.body.pib;
        let maticniBroj = req.body.maticniBroj;

        Enterprise.findOne({'ime':ime, 'prezime': prezime, 'username': username, 'telefon': telefon, 'email': email, 'nazivPreduzeca': nazivPreduzeca, 'adresaPreduzeca': adresaPreduzeca, 'pib': pib, 'maticniBroj': maticniBroj}, (err, r)=>{
            if(err) console.log(err)
            else res.json(r)
        })
    }

    getEnterpriseByPIB = (req: express.Request, res: express.Response)=>{
        let pib = req.body.pib;

        Enterprise.findOne({'pib':pib}, (err, r)=>{
            if(err) console.log(err)
            else res.json(r)
        })
    }

    getAllRequests = (req: express.Request, res: express.Response)=>{
        EnterpriseRequest.find({}, (err, requests)=>{
            if(err) console.log(err)
            else res.json(requests);
        })
    }

    getAllEnterprises = (req: express.Request, res: express.Response)=>{
        Enterprise.find({}, (err, enterprises)=>{
            if(err) console.log(err)
            else res.json(enterprises);
        })
    }

    getCustomer = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;

        Customer.findOne({'id':id}, (err, customer)=>{
            if(err) console.log(err)
            else res.json(customer);
        })
    }

    updateEnterpriseData = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let kategorija = req.body.kategorija;
        let sifreDelatnosti = req.body.sifreDelatnosti;
        let ziroRacuni = req.body.ziroRacuni;
        let uPDVsistemu = req.body.uPDVsistemu;
        let magacini = req.body.magacini;
        let kase = req.body.kase;

        let noviMagacini = [];

        for (let index = 0; index < magacini.length; index++) {
            let data = {
                id: magacini[index].id,
                naziv: magacini[index].naziv,
                artikli: []
            }

            noviMagacini.push(data);
        }

        Enterprise.collection.updateOne({'id':parseInt(id)}, {$set: {'kategorija':kategorija, 'sifreDelatnosti':sifreDelatnosti, 'uPDVsistemu':uPDVsistemu, 'ziroRacuni':ziroRacuni, 'magacini':noviMagacini, 'kase':kase}}, (err, r)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    changePassword = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let password = req.body.password;

        User.collection.updateOne({'id':id}, {$set: {'password':password}}, (err,r)=>{
            if(err) console.log(err);
            else {
                Enterprise.collection.updateOne({'id':id}, {$set: {'password':password}}, (err, r)=>{
                    if(err) console.log(err);
                    else res.json({'message':'ok'});
                })
            }
        })
    }

    getAllItems = (req: express.Request, res: express.Response)=>{
        let idPreduzeca = req.body.idPreduzeca;

        EnterpriseItem.findOne({'idPreduzeca':idPreduzeca}, (err, items)=>{
            if(err) console.log(err)
            else {
                res.json(items)
            }
        })
    }

    getAllItemsStorageLocations = (req: express.Request, res: express.Response)=>{
        let idPreduzeca = req.body.idPreduzeca;

        Enterprise.findOne({'idPreduzeca':idPreduzeca}, (err, ent)=>{
            if(err) console.log(err)
            else{
                if(ent){
                    let returnArray = [];

                    let magacini = ent.magacini;
                    let lokacije = ent.kase;

                    for (let index = 0; index < magacini.length; index++) {
                        for(let index2 = 0; index2 < magacini[index].artikli.length; index2++){
                            let data = {
                                naziv: magacini[index].artikli[index2].naziv,
                                sifra: magacini[index].artikli[index2].sifra,
                                nabavnaCena: magacini[index].artikli[index2].nabavnaCena,
                                prodajnaCena: magacini[index].artikli[index2].prodajnaCena,
                                stanje: magacini[index].artikli[index2].stanje,
                                minKolicina: magacini[index].artikli[index2].minKolicina,
                                maxKolicina: magacini[index].artikli[index2].maxKolicina
                            }

                            returnArray.push(data);
                        }
                    }

                    for(let index=0; index<lokacije.length; index++){
                        for(let index2=0; index2<lokacije[index].artikli.length; index2++){
                            console.log(lokacije[index].artikli[index2])
                            let data = {
                                naziv: lokacije[index].artikli[index2].naziv,
                                sifra: lokacije[index].artikli[index2].sifra,
                                nabavnaCena: lokacije[index].artikli[index2].nabavnaCena,
                                prodajnaCena: lokacije[index].artikli[index2].prodajnaCena,
                                stanje: lokacije[index].artikli[index2].stanje,
                                minKolicina: lokacije[index].artikli[index2].minKolicina,
                                maxKolicina: lokacije[index].artikli[index2].maxKolicina
                            }

                            returnArray.push(data);
                        }
                    }

                    return res.json(returnArray);
                }
            }
        })
    } 

    addItem = (req: express.Request, res: express.Response)=>{
        let idPreduzeca = req.body.idPreduzeca;
        let magaciniUnos = req.body.magacini;
        let lokacijeUnos = req.body.lokacije;

        Enterprise.findOne({'id':idPreduzeca}, (err, ent)=>{
            if(err) console.log(err)
            else{
                let artikal;

                if(ent.kategorija=="Ugostiteljski objekat"){
                    artikal = {
                        sifra: req.body.sifra,
                        naziv: req.body.naziv,
                        jedinicaMere: req.body.jedinicaMere,
                        poreskaStopa: parseInt(req.body.stopaPoreza),
                        proizvodjac: req.body.proizvodjac,
                        tip: req.body.tip,
                        nabavnaCena: req.body.nabavnaCena,
                        prodajnaCena: req.body.prodajnaCena,
                        stanje: req.body.stanje,
                        minKolicina: req.body.minKolicina,
                        maxKolicina: req.body.maxKolicina,
                        slicica: req.body.slicica
                    }
                } else {
                    artikal = {
                        sifra: req.body.sifra,
                        naziv: req.body.naziv,
                        jedinicaMere: req.body.jedinicaMere,
                        poreskaStopa: parseInt(req.body.stopaPoreza),
                        proizvodjac: req.body.proizvodjac,
                        nabavnaCena: req.body.nabavnaCena,
                        prodajnaCena: req.body.prodajnaCena,
                        stanje: req.body.stanje,
                        minKolicina: req.body.minKolicina,
                        maxKolicina: req.body.maxKolicina,
                        slicica: req.body.slicica
                    }
                }
                let magacini = ent.magacini;
                let lokacije = ent.kase;

                for (let index = 0; index < magacini.length; index++) {
                    for(let index2 = 0; index2 < magacini[index].artikli.length; index2++){
                        if(magacini[index].artikli[index2].sifra==artikal.sifra){
                            res.json({'message':'sifra vec postoji'})
                            return;
                        }
                    }
                }

                if(magaciniUnos.length>0){
                    for(let index = 0; index < magaciniUnos.length; index++){
                        for(let index2 = 0; index2 < magacini.length; index2++){
                            if(magaciniUnos[index].id==magacini[index2].id){
                                magacini[index2].artikli.push(artikal);
                            }
                        }
                    }
                }

                if(lokacijeUnos.length>0){
                    for(let index=0; index < lokacijeUnos.length; index++){
                        for(let index2 = 0; index2 < lokacije.length; index2++){
                            if(lokacijeUnos[index].naziv==lokacije[index2].naziv){
                                lokacije[index2].artikli.push(artikal)
                            }
                        }
                    }
                }

                Enterprise.updateOne({'id':idPreduzeca}, {$set: {"magacini":magacini, "kase":lokacije}}, (err, r)=>{
                    if(err) console.log(err)
                    else {
                        EnterpriseItem.findOne({'idPreduzeca':idPreduzeca}, (err, entItems)=>{
                            if(err) console.log(err)
                            else if(entItems){
                                let artikalBasic = {
                                    sifra: artikal.sifra,
                                    naziv: artikal.naziv,
                                    jedinicaMere: artikal.jedinicaMere,
                                    poreskaStopa: artikal.poreskaStopa,
                                    proizvodjac: artikal.proizvodjac
                                }

                                let artikli = entItems.artikli;
                                artikli.push(artikalBasic);

                                EnterpriseItem.updateOne({'idPreduzeca':idPreduzeca}, {$set: {'artikli':artikli}}, (err, e)=>{
                                    if(err) console.log(err)
                                    else res.json({'message':'ok'})
                                })
                            } else {
                                let enterpriseItem = new EnterpriseItem({
                                    idPreduzeca: idPreduzeca,
                                    artikli: [
                                        {
                                            sifra: artikal.sifra,
                                            naziv: artikal.naziv,
                                            jedinicaMere: artikal.jedinicaMere,
                                            poreskaStopa: artikal.poreskaStopa,
                                            proizvodjac: artikal.proizvodjac
                                        }
                                    ]
                                })

                                enterpriseItem.save().then(entItem=>{}).catch(err=>{
                                    console.log(err)
                                })

                                res.json({'message':'ok'})
                            }
                        })
                    }
                })
            }
        })
    }

    changeItem = (req: express.Request, res: express.Response)=>{
        let idPreduzeca = req.body.idPreduzeca;
        //let idMagacinaTrenutni = req.body.idMagacinaTrenutni;
        //let idMagacina = req.body.idMagacina;
        let sifraTrenutni = req.body.sifraTrenutni;

        Enterprise.findOne({'id':idPreduzeca}, (err, ent)=>{
            if(err) console.log(err)
            else {
                let magacini = ent.magacini;
                let lokacije = ent.kase;
                let artikal;

                if(ent.kategorija=="Ugostiteljski objekat"){
                    artikal = {
                        sifra: req.body.sifra,
                        naziv: req.body.naziv,
                        jedinicaMere: req.body.jedinicaMere,
                        poreskaStopa: parseInt(req.body.stopaPoreza),
                        proizvodjac: req.body.proizvodjac,
                        tip: req.body.tip,
                        nabavnaCena: req.body.nabavnaCena,
                        prodajnaCena: req.body.prodajnaCena,
                        stanje: req.body.stanje,
                        minKolicina: req.body.minKolicina,
                        maxKolicina: req.body.maxKolicina,
                        slicica: req.body.slicica
                    }
                } else {
                    artikal = {
                        sifra: req.body.sifra,
                        naziv: req.body.naziv,
                        jedinicaMere: req.body.jedinicaMere,
                        poreskaStopa: parseInt(req.body.stopaPoreza),
                        proizvodjac: req.body.proizvodjac,
                        nabavnaCena: req.body.nabavnaCena,
                        prodajnaCena: req.body.prodajnaCena,
                        stanje: req.body.stanje,
                        minKolicina: req.body.minKolicina,
                        maxKolicina: req.body.maxKolicina,
                        slicica: req.body.slicica
                    }
                }

                for(let index=0; index<magacini.length; index++){
                    for(let index2=0; index2<magacini[index].artikli.length; index2++){
                        if(sifraTrenutni==magacini[index].artikli[index2].sifra){
                            magacini[index].artikli[index2] = artikal;
                            break;
                        }
                    }
                }

                for(let index=0; index<lokacije.length; index++){
                    for(let index2=0; index2<lokacije[index].artikli.length; index2++){
                        if(sifraTrenutni==lokacije[index].artikli[index2].sifra){
                            lokacije[index].artikli[index2] = artikal;
                            break;
                        }
                    }
                }

                Enterprise.updateOne({'id':idPreduzeca}, {$set: {"magacini":magacini, "kase":lokacije}}, (err, r)=>{
                    if(err) console.log(err)
                    else res.json({'message':'ok'})
                })
            }
        })
    }

    removeItem = (req: express.Request, res: express.Response)=>{
        let id = req.body.idPreduzeca;
        let artikal = req.body.artikal;
        let found = false;

        Enterprise.findOne({'id':id},(err, ent)=>{
            if(err) console.log(err)
            else {
                let magacini = ent.magacini;

                for (let index = 0; index < magacini.length; index++) {
                    for(let index2 = 0; index2 < magacini[index].artikli.length; index2++){
                        if(magacini[index].artikli[index2].sifra==artikal.sifra){
                            magacini[index].artikli.splice(index2,1);
                            found = true;
                            break;
                        }
                    }
                    if(found) break;
                }

                Enterprise.updateOne({'id':id}, {$set: {'magacini':magacini}}, (err, r)=>{
                    if(err) console.log(err)
                    else {
                        res.json({'message':'ok'});
                    }
                })
            }
        })
    }

    updateStorageState = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let magacini = req.body.magacini;
        let kase = req.body.kase;

        Enterprise.findOneAndUpdate({'id':id}, {$set: {'magacini':magacini, 'kase':kase}}, (err, ent)=>{
            if(err) console.log(err)
            else res.json({'message':'ok'})
        })
    }

    updateStorageStateLocation = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let kase = req.body.kase;

        Enterprise.findOneAndUpdate({'id':id}, {$set: {'kase':kase}}, (err, ent)=>{
            if(err) console.log(err)
            else res.json({'message':'ok'})
        })
    }
}