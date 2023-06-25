import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Enterprise } from '../models/enterprise';
import { Storage } from '../models/storage';
import { UserService } from '../services/user.service';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from '../models/item';
import { Receipt } from '../models/receipt';
import { BuyersService } from '../services/buyers.service';
import { Buyers } from '../models/buyers';
import { ReceiptService } from '../services/receipt.service';
import { BuyerInfo } from '../models/buyerInfo';
import { cashRegister } from '../models/cashRegister';
import { TableArangements } from '../models/tableArangements';
import { EnterpriseTablesService } from '../services/enterprise-tables.service';

@Component({
  selector: 'app-enterprise-receipt-publish',
  templateUrl: './enterprise-receipt-publish.component.html',
  styleUrls: ['./enterprise-receipt-publish.component.css']
})
export class EnterpriseReceiptPublishComponent implements OnInit, AfterViewInit {

  @ViewChild('dialogBiranjeArtikla') dialogBiranjeArtikla: TemplateRef<any>;
  @ViewChild('dialogPlacanjeRacuna') dialogPlacanjeRacuna: TemplateRef<any>;
 
  @ViewChild('prikazStolova') prikazStolova: ElementRef<HTMLCanvasElement>;
  
  constructor(private userService: UserService, private ruter: Router, private dialog: MatDialog, private buyersService: BuyersService, private receiptService: ReceiptService, private tableService: EnterpriseTablesService) { }

  ngOnInit(): void {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if(currentUser==null){
      this.ruter.navigate(['/login']);
      return;
    } else if(currentUser.tip!=2){
      switch(currentUser.tip){
        case 0:
          this.ruter.navigate(['/admin']);
          return;;
        case 1:
          this.ruter.navigate(['/customer']);
          return;
      }
    } else {
      let id = currentUser.id;

      this.userService.getEnterpriseById(id).subscribe((ent: Enterprise)=>{
        if(ent){
          this.preduzece = ent;

          this.buyersService.getAllBuyers(ent.id).subscribe((buyers: Buyers)=>{
            if(buyers){
              this.narucioci = buyers;
            } else this.narucioci = null;
          
            if(ent.kategorija=="Ugostiteljski objekat"){
              this.tableService.getAllLocations(ent.id).subscribe((arng: TableArangements)=>{
                if(arng){
                  this.rasporedStolova = arng;
                  this.prikaziRaspored = true;

                  for(let index=0; index<this.rasporedStolova.objekti.length; index++){
                    this.links.push(this.rasporedStolova.objekti[index].lokacija);

                    let racuni = [
                      {
                        idStola: 1,
                        racun: null
                      },
                      {
                        idStola: 2,
                        racun: null
                      },
                      {
                        idStola: 3,
                        racun: null
                      },
                      {
                        idStola: 4,
                        racun: null
                      }
                    ]

                    this.racuniLokacije.push(racuni);
                  }

                  this.activeLink = this.rasporedStolova.objekti[0].lokacija;

                  this.racuniTrenutneLokacije = this.racuniLokacije[0];
                  this.rasporedStolovaIzabranaLokacija = this.rasporedStolova.objekti[0].lokacija;
              
                  this.rasporedStolovaIzabranaLokacijaArtikli = this.preduzece.kase[0];
                } else this.rasporedStolova = null;
              })
            }
          })
        }
      })
    }
  }

  ngAfterViewInit(): void {
    const canvas = <HTMLCanvasElement>(document.getElementById('canvas0'));

    if(!canvas)return;

    this.context = canvas.getContext('2d');

    this.context.fillStyle = 'white';
    this.context.strokeStyle = 'black';
    this.context.rect(100, 60, 200, 150) // id1
    this.context.stroke();
    this.context.fill();
    
    this.context.beginPath();
    this.context.arc(650, 135, 80, 0, 2*Math.PI); //id2
    this.context.stroke();
    this.context.fill();

    this.context.beginPath();
    this.context.arc(200, 380, 80, 0, 2*Math.PI); //id3
    this.context.stroke();
    this.context.fill();

    this.context.rect(555, 305, 200, 150) //id4
    this.context.stroke();
    this.context.fill();

    this.context.fillStyle = 'black'
    this.context.font = "20px Arial";
    this.context.fillText("1", 105, 80);
    this.context.fillText("2", 600, 90);
    this.context.fillText("3", 150, 335);
    this.context.fillText("4", 560, 325);

    // ako ne renderuje ovde dodaj dodeljivanje vrednosti kao u event-u
  }

  preduzece: Enterprise;
  narucioci: Buyers;
  izabraniMagacin: Storage = null;
  izabraniNarucioc: BuyerInfo = null;
  izabranaLokacija: string = "";
  idIzabranogMagacina: string = "";

  kolicina: number = 1;
  izabraniArtikal: Item = null;
  errMsg: string = "";
  errMsgLokacija: string = "";

  page = 1;
  pageObjekat = 1;
  pageSize = 5;

  racun: Receipt = null;
  nacinPlacanja: number = 1;
  placeno: number = 0;
  brojLK: string = "";
  imeKupca: string = "";
  prezimeKupca: string = "";
  brojSlip: string = "";

  nazivIzabraneLokacije: string = "";
  izabranaLokacijaArtikli: cashRegister = null;

  onChange(newValue){
    if(this.idIzabranogMagacina != "" && this.izabraniMagacin != null){
      for(let index = 0; index < this.preduzece.magacini.length; index++){
        if(this.idIzabranogMagacina==this.preduzece.magacini[index].id){
          this.preduzece.magacini[index] = this.izabraniMagacin;
          break;
        }
      }
    }

    this.idIzabranogMagacina = newValue;

    this.nazivIzabraneLokacije = "";
    this.izabranaLokacijaArtikli = null;
    
    for(let index = 0; index < this.preduzece.magacini.length; index++){
      if(this.idIzabranogMagacina==this.preduzece.magacini[index].id){
        this.izabraniMagacin = this.preduzece.magacini[index];
        break;
      }
    }
  }

  onChangeLocation(newValue){
    this.errMsgLokacija = '';
    if(this.racun != null && newValue != this.izabranaLokacija){
      this.errMsgLokacija = 'Ne mozete da promenite lokaciju dok ne zatvorite racun! Trenutna lokacija u kojoj je otvoren racun je: ' + this.izabranaLokacija + '.';
      return;
    } else this.izabranaLokacija = newValue;
  }

  onChangeLocItems(newValue){
    if(this.nazivIzabraneLokacije != "" && this.izabranaLokacijaArtikli != null){
      for(let index=0; index < this.preduzece.kase.length; index++){
        if(this.nazivIzabraneLokacije == this.preduzece.kase[index].lokacija){
          this.preduzece.kase[index] = this.izabranaLokacijaArtikli;
          break;
        }
      }
    }

    this.nazivIzabraneLokacije = newValue;

    this.idIzabranogMagacina = "";
    this.izabraniMagacin = null;

    for(let index = 0; index < this.preduzece.kase.length; index++){
      if(this.nazivIzabraneLokacije==this.preduzece.kase[index].lokacija){
        this.izabranaLokacijaArtikli = this.preduzece.kase[index];
        break;
      }
    }
  }

  onChangeKolicina(event){
    this.errMsg = '';

    if(event.target.value==""){
      this.errMsg = "Kolicina mora da se unese."
      return;
    }

    this.kolicina = parseInt(event.target.value);
    if(this.izabraniArtikal.stanje<parseInt(event.target.value)){
      this.errMsg = "Nema unesene kolicine artikla na stanju.";
    } else if(parseInt(event.target.value)<=0){
      this.errMsg = "Kolicina ne sme da bude manja ili jednaka 0.";
    }
  }

  changeNacinPlacanja(value){
    switch(value){
      case 1:
        this.nacinPlacanja = 1;
        break;
      case 2:
        this.nacinPlacanja = 2;
        break;
      case 3:
        this.nacinPlacanja = 3;
        break;
      case 4:
        this.nacinPlacanja = 4
        break;
    }
  }

  onChangePlaceno(event){
    this.errMsg = '';
    this.placeno = parseInt(event.target.value);

    if(this.placeno < this.racun.iznos){
      this.errMsg = "Placen iznos je manji od iznosa racuna!";
      return;
    }
  }

  changeLicnaKarta(newValue){
    this.errMsg = '';
    this.brojLK = newValue;

    let regexLK = /^[0-9]{13}$/
    let result = regexLK.test(this.brojLK);
    if(!result){
      this.errMsg = "Licna karta nije u dobrom formatu!"
    }
  }

  izaberiNarucioca(narucioc: BuyerInfo){
    this.izabraniNarucioc = narucioc;
  }

  prikaziDialogBiranjeArtikla(artikal: Item){
    this.izabraniArtikal = artikal;

    let dialogRef = this.dialog.open(this.dialogBiranjeArtikla);
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        if(result == 'add'){
          // dodaj artikal na racun
          if(this.preduzece.kategorija=="Ugostiteljski objekat"){
            let idStola = parseInt(this.idIzabranogStola);
            let racunStola = this.racuniTrenutneLokacije[idStola-1].racun;

            if(racunStola==null){
              let iznosRacuna = this.izabraniArtikal.prodajnaCena * this.kolicina;
              let pdv = 0;
              if(this.preduzece.uPDVsistemu){
                pdv = iznosRacuna * (this.izabraniArtikal.poreskaStopa/100)
              }
  
              let racun = {
                naziv: this.preduzece.nazivPreduzeca,
                lokacija: this.rasporedStolovaIzabranaLokacija,
                iznos: iznosRacuna,
                pdv: pdv,
                datum: null,
                stavke: [
                  {
                    sifra: this.izabraniArtikal.sifra,
                    naziv: this.izabraniArtikal.naziv,
                    jedinicaMere: this.izabraniArtikal.jedinicaMere,
                    poreskaStopa: this.izabraniArtikal.poreskaStopa,
                    proizvodjac: this.izabraniArtikal.proizvodjac,
                    prodajnaCena: this.izabraniArtikal.prodajnaCena,
                    slicica: this.izabraniArtikal.slicica,
                    kolicina: this.kolicina
                  }
                ],
                nacinPlacanja: ''
              }

              this.racuniTrenutneLokacije[idStola-1].racun = racun;

              console.log(this.racuniTrenutneLokacije[idStola-1].racun.stavke)
              
              for(let index=0; index<this.rasporedStolova.objekti.length; index++){
                let found = false;
                for(let index2=0; index2<this.rasporedStolova.objekti[index].stolovi.length; index2++){
                  if(this.rasporedStolova.objekti[index].stolovi[index2].idStola==idStola && this.rasporedStolova.objekti[index].lokacija==this.rasporedStolovaIzabranaLokacija){
                    this.rasporedStolova.objekti[index].stolovi[index2].zauzet = true;

                    this.drawZauzeto(index, this.rasporedStolovaIzabranaLokacija);

                    this.idIzabranogStola = "";

                    found = true;
                  }
                  if(found) break;
                }
                if(found) break;
              }
            } else if(racunStola.stavke.find(racun=> racun.sifra==this.izabraniArtikal.sifra)!=undefined){
              for(let index = 0; index < racunStola.stavke.length; index++){
                if(racunStola.stavke[index].sifra == this.izabraniArtikal.sifra){
                  let iznosRacuna = this.izabraniArtikal.prodajnaCena * this.kolicina;
                  let pdv = 0;
                  if(this.preduzece.uPDVsistemu){
                    pdv = iznosRacuna * (this.izabraniArtikal.poreskaStopa/100)
                  }

                  this.racun.iznos = this.racun.iznos + iznosRacuna;
                  this.racun.pdv = this.racun.pdv + pdv;

                  let novaKolicina = this.racun.stavke[index].kolicina + this.kolicina;
                  racunStola.stavke[index].kolicina = novaKolicina;

                  break;
                }
              }
            } else {
              let iznosRacuna = this.izabraniArtikal.prodajnaCena * this.kolicina;
              let pdv = 0;
              if(this.preduzece.uPDVsistemu){
                pdv = iznosRacuna * (this.izabraniArtikal.poreskaStopa/100)
              }
  
              racunStola.iznos = racunStola.iznos + iznosRacuna;
              racunStola.pdv = racunStola.pdv + pdv;
  
              let stavka = {
                sifra: this.izabraniArtikal.sifra,
                naziv: this.izabraniArtikal.naziv,
                jedinicaMere: this.izabraniArtikal.jedinicaMere,
                poreskaStopa: this.izabraniArtikal.poreskaStopa,
                proizvodjac: this.izabraniArtikal.proizvodjac,
                prodajnaCena: this.izabraniArtikal.prodajnaCena,
                slicica: this.izabraniArtikal.slicica,
                kolicina: this.kolicina
              }
  
              racunStola.stavke.push(stavka);
              this.racuniTrenutneLokacije[idStola-1].racun = racunStola;
            }

            for(let index = 0; index < this.rasporedStolovaIzabranaLokacijaArtikli.artikli.length; index++){
              if(this.izabraniArtikal.sifra==this.rasporedStolovaIzabranaLokacijaArtikli.artikli[index].sifra){
                this.rasporedStolovaIzabranaLokacijaArtikli.artikli[index].stanje -= this.kolicina;
                break;
              }
            }
  
            for(let index = 0; index < this.preduzece.kase.length; index++){
              if(this.preduzece.kase[index].lokacija==this.rasporedStolovaIzabranaLokacija){
                this.preduzece.kase[index]=this.rasporedStolovaIzabranaLokacijaArtikli;
                break;
              }
            }

            this.kolicina = 1;
          } else{
            if(this.racun == null){
              let iznosRacuna = this.izabraniArtikal.prodajnaCena * this.kolicina;
              let pdv = 0;
              if(this.preduzece.uPDVsistemu){
                pdv = iznosRacuna * (this.izabraniArtikal.poreskaStopa/100)
              }
  
              let racun = {
                _id: '',
                naziv: this.preduzece.nazivPreduzeca,
                lokacija: this.izabranaLokacija,
                iznos: iznosRacuna,
                pdv: pdv,
                datum: null,
                stavke: [
                  {
                    sifra: this.izabraniArtikal.sifra,
                    naziv: this.izabraniArtikal.naziv,
                    jedinicaMere: this.izabraniArtikal.jedinicaMere,
                    poreskaStopa: this.izabraniArtikal.poreskaStopa,
                    proizvodjac: this.izabraniArtikal.proizvodjac,
                    prodajnaCena: this.izabraniArtikal.prodajnaCena,
                    slicica: this.izabraniArtikal.slicica,
                    kolicina: this.kolicina
                  }
                ],
                nacinPlacanja: ''
              }
  
              this.racun = racun;
            } else {
              if(this.racun.stavke.find(racun=> racun.sifra==this.izabraniArtikal.sifra)!=undefined){
                for(let index = 0; index < this.racun.stavke.length; index++){
                  if(this.racun.stavke[index].sifra == this.izabraniArtikal.sifra){
                    let iznosRacuna = this.izabraniArtikal.prodajnaCena * this.kolicina;
                    let pdv = 0;
                    if(this.preduzece.uPDVsistemu){
                      pdv = iznosRacuna * (this.izabraniArtikal.poreskaStopa/100)
                    }
  
                    this.racun.iznos = this.racun.iznos + iznosRacuna;
                    this.racun.pdv = this.racun.pdv + pdv;
  
                    let novaKolicina = this.racun.stavke[index].kolicina + this.kolicina;
                    this.racun.stavke[index].kolicina = novaKolicina;
                  }
                }
              } else {
                let iznosRacuna = this.izabraniArtikal.prodajnaCena * this.kolicina;
                let pdv = 0;
                if(this.preduzece.uPDVsistemu){
                  pdv = iznosRacuna * (this.izabraniArtikal.poreskaStopa/100)
                }
  
                this.racun.iznos = this.racun.iznos + iznosRacuna;
                this.racun.pdv = this.racun.pdv + pdv;
  
                let stavka = {
                  sifra: this.izabraniArtikal.sifra,
                  naziv: this.izabraniArtikal.naziv,
                  jedinicaMere: this.izabraniArtikal.jedinicaMere,
                  poreskaStopa: this.izabraniArtikal.poreskaStopa,
                  proizvodjac: this.izabraniArtikal.proizvodjac,
                  prodajnaCena: this.izabraniArtikal.prodajnaCena,
                  slicica: this.izabraniArtikal.slicica,
                  kolicina: this.kolicina
                }
  
                this.racun.stavke.push(stavka);
              }
            }
  
            if(this.izabraniMagacin!=null){
              for(let index = 0; index < this.izabraniMagacin.artikli.length; index++){
                if(this.izabraniArtikal.sifra==this.izabraniMagacin.artikli[index].sifra){
                  this.izabraniMagacin.artikli[index].stanje -= this.kolicina;
                }
              }
    
              for(let index = 0; index < this.preduzece.magacini.length; index++){
                if(this.preduzece.magacini[index].id==this.izabraniMagacin.id){
                  this.preduzece.magacini[index]=this.izabraniMagacin;
                  break;
                }
              }
            }
  
            if(this.izabranaLokacijaArtikli!=null){
              for(let index = 0; index < this.izabranaLokacijaArtikli.artikli.length; index++){
                if(this.izabraniArtikal.sifra==this.izabranaLokacijaArtikli.artikli[index].sifra){
                  this.izabranaLokacijaArtikli.artikli[index].stanje -= this.kolicina;
                }
              }
    
              for(let index = 0; index < this.preduzece.kase.length; index++){
                if(this.preduzece.kase[index].lokacija==this.izabranaLokacija){
                  this.preduzece.kase[index]=this.izabranaLokacijaArtikli;
                  break;
                }
              }
            }
  
            this.kolicina = 1;
          }
        } else if(result=='cancel'){
          this.kolicina = 1;
        }
      }
    })
  }

  prikaziDialogPlacanjeRacuna(){
    let dialogRef = this.dialog.open(this.dialogPlacanjeRacuna);
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        if(result=='pay'){
          let datumIzvestaj = new Date();
          datumIzvestaj.setHours(0,0,0,0);

          if(this.nacinPlacanja==1){
            // placanje gotovinom
            let date = new Date();
            this.racun.datum = date;
            this.racun.nacinPlacanja = "Gotovina";

            this.receiptService.addToDailyReport(this.preduzece.nazivPreduzeca, this.preduzece.pib, datumIzvestaj, this.racun.iznos, this.racun.pdv).subscribe(res=>{
              if(res['message']=='ok'){
                this.receiptService.addReceiptCash(this.racun, this.placeno, this.brojLK, this.placeno-this.racun.iznos).subscribe(res=>{
                  if(res['message']=='ok'){
                    this.userService.updateStorageState(this.preduzece.id, this.preduzece.magacini, this.preduzece.kase).subscribe(res=>{
                      if(res['message']=='ok'){
                        this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
                          this.ruter.navigate(['/enterpriseReceiptPublish']);
                        });
                      }
                    })
                  }
                })
              }
            })
          }
          else if(this.nacinPlacanja==2){
            // placanje cekom

            let date = new Date();
            this.racun.datum = date;
            this.racun.nacinPlacanja = "Cek"

            this.receiptService.addToDailyReport(this.preduzece.nazivPreduzeca, this.preduzece.pib, datumIzvestaj, this.racun.iznos, this.racun.pdv).subscribe(res=>{
              if(res['message']=='ok'){
                this.receiptService.addReceiptCheck(this.racun, this.imeKupca, this.prezimeKupca, this.brojLK).subscribe(res=>{
                  if(res['message']=='ok'){
                    this.userService.updateStorageState(this.preduzece.id, this.preduzece.magacini, this.preduzece.kase).subscribe(res=>{
                      if(res['message']=='ok'){
                        this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
                          this.ruter.navigate(['/enterpriseReceiptPublish']);
                        });
                      }
                    })
                  }
                })
              }
            })
          }
          else if(this.nacinPlacanja==3){
            // placanje karticom

            let date = new Date();
            this.racun.datum = date;
            this.racun.nacinPlacanja = "Kartica"

            this.receiptService.addToDailyReport(this.preduzece.nazivPreduzeca, this.preduzece.pib, datumIzvestaj, this.racun.iznos, this.racun.pdv).subscribe(res=>{
              if(res['message']=='ok'){
                this.receiptService.addReceiptCard(this.racun, this.brojLK, this.brojSlip).subscribe(res=>{
                  if(res['message']=='ok'){
                    this.userService.updateStorageState(this.preduzece.id, this.preduzece.magacini, this.preduzece.kase).subscribe(res=>{
                      if(res['message']=='ok'){
                        this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
                          this.ruter.navigate(['/enterpriseReceiptPublish']);
                        });
                      }
                    })
                  }
                })
              }
            })            
          }
          else if(this.nacinPlacanja==4){
            // placanje virmanom

            let iznosRabat = this.racun.iznos - (this.racun.iznos*(this.izabraniNarucioc.rabat/100));
            let pdvRabat = this.racun.pdv - (this.racun.pdv * (this.izabraniNarucioc.rabat/100));

            let date = new Date();
            this.racun.datum = date;
            this.racun.nacinPlacanja = "Virman";
            this.racun.iznos = iznosRabat;
            this.racun.pdv = pdvRabat;

            this.receiptService.addToDailyReport(this.preduzece.nazivPreduzeca, this.preduzece.pib, datumIzvestaj, this.racun.iznos, this.racun.pdv).subscribe(res=>{
              if(res['messge']=='ok'){
                this.receiptService.addReceiptVirman(this.racun, this.izabraniNarucioc).subscribe(res=>{
                  if(res['message']=='ok'){
                    this.userService.updateStorageState(this.preduzece.id, this.preduzece.magacini, this.preduzece.kase).subscribe(res=>{
                      if(res['message']=='ok'){
                        this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
                          this.ruter.navigate(['/enterpriseReceiptPublish']);
                        });
                      }
                    })
                  }
                })
              }
            })
          }
        } else if(result=='cancel'){
          if(this.nacinPlacanja==1){
            this.placeno = 0;
            this.brojLK = "";
          } else if(this.nacinPlacanja==2){
            this.imeKupca = "";
            this.prezimeKupca = "";
            this.brojLK = "";
          } else if(this.nacinPlacanja==3){
            this.brojLK = "";
            this.brojSlip = "";
          }
        }
      }
    })
  }

  //========================================================================================
  // DEO IZDAVANJA RACUNA ZA UGOSTITELJE

  rasporedStolova: TableArangements;
  rasporedStolovaIzabranaLokacija: string = "";
  rasporedStolovaIzabranaLokacijaArtikli: cashRegister;
  links = [];
  activeLink = "";
  prikaziRaspored: boolean = false;

  racuniLokacije = [];
  racuniTrenutneLokacije = [];
  racunZaPlacanje: Receipt = null;
  stoZaPlacanje: number = 0;

  slobodniStolovi = [1, 2, 3, 4];
  idIzabranogStola = "";

  nacinPlacanja1: number = 1;
  nacinPlacanja2: number = 1;
  nacinPlacanja3: number = 1;
  nacinPlacanja4: number = 1;

  pageRasporedStolova = 1;

  context: CanvasRenderingContext2D;

  changeNacinPlacanja1(newValue){
    switch(newValue){
      case 1:
        this.nacinPlacanja1 = 1;
        break;
      case 2:
        this.nacinPlacanja1 = 2;
        break;
      case 3:
        this.nacinPlacanja1 = 3;
        break;
      case 4:
        this.nacinPlacanja1 = 4
        break;
    }
  }

  changeNacinPlacanja2(newValue){
    switch(newValue){
      case 1:
        this.nacinPlacanja2 = 1;
        break;
      case 2:
        this.nacinPlacanja2 = 2;
        break;
      case 3:
        this.nacinPlacanja2 = 3;
        break;
      case 4:
        this.nacinPlacanja2 = 4
        break;
    }
  }

  changeNacinPlacanja3(newValue){
    switch(newValue){
      case 1:
        this.nacinPlacanja3 = 1;
        break;
      case 2:
        this.nacinPlacanja3 = 2;
        break;
      case 3:
        this.nacinPlacanja3 = 3;
        break;
      case 4:
        this.nacinPlacanja3 = 4
        break;
    }
  }

  changeNacinPlacanja4(newValue){
    switch(newValue){
      case 1:
        this.nacinPlacanja4 = 1;
        break;
      case 2:
        this.nacinPlacanja4 = 2;
        break;
      case 3:
        this.nacinPlacanja4 = 3;
        break;
      case 4:
        this.nacinPlacanja4 = 4
        break;
    }
  }

  onChangeIzabraniSto(newValue){
    this.idIzabranogStola = newValue;
  }

  onChangePlacenoStolovi(event){
    this.errMsg = '';
    this.placeno = parseInt(event.target.value);

    if(this.placeno < this.racunZaPlacanje.iznos){
      this.errMsg = "Placen iznos je manji od iznosa racuna!";
      return;
    }
  }

  drawZauzeto(index, izabranaLokacija){
    const canvas = <HTMLCanvasElement>(document.getElementById('canvas'+index));

    if(!canvas)return;

    this.context = canvas.getContext('2d');

    this.context.fillStyle = 'red';

    for(let index=0; index<this.rasporedStolova.objekti.length; index++){
      for(let index2=0; index2<this.rasporedStolova.objekti[index].stolovi.length; index2++){
        if(this.rasporedStolova.objekti[index].stolovi[index2].zauzet==true && this.rasporedStolova.objekti[index].lokacija==izabranaLokacija){
          switch(this.rasporedStolova.objekti[index].stolovi[index2].idStola){
            case 1:
              this.context.fillText("Zauzet", 165, 140); // za id1
              break;
            case 2:
              this.context.fillText("Zauzet", 620, 140); // za id2
              break;
            case 3:
              this.context.fillText("Zauzet", 170, 385); // za id3
              break;
            case 4:
              this.context.fillText("Zauzet", 620, 385); // za id4
              break;
          }
        }
      }
    }
  }

  drawSlobodno(index, izabranaLokacija){
    const canvas = <HTMLCanvasElement>(document.getElementById('canvas'+index));

    if(!canvas)return;

    this.context = canvas.getContext('2d');

    this.context.fillStyle = 'white';
    this.context.strokeStyle = 'black';

    for(let index=0; index<this.rasporedStolova.objekti.length; index++){
      for(let index2=0; index2<this.rasporedStolova.objekti[index].stolovi.length; index2++){
        if(this.rasporedStolova.objekti[index].stolovi[index2].zauzet==false && this.rasporedStolova.objekti[index].lokacija==izabranaLokacija){
          switch(this.rasporedStolova.objekti[index].stolovi[index2].idStola){
            case 1:
              this.context.rect(100, 60, 200, 150) // id1
              this.context.stroke();
              this.context.fill();
              break;
            case 2:
              this.context.beginPath();
              this.context.arc(650, 135, 80, 0, 2*Math.PI); //id2
              this.context.stroke();
              this.context.fill();
              break;
            case 3:
              this.context.beginPath();
              this.context.arc(200, 380, 80, 0, 2*Math.PI); //id3
              this.context.stroke();
              this.context.fill();
              break;
            case 4:
              this.context.rect(555, 305, 200, 150) //id4
              this.context.stroke();
              this.context.fill();
              break;
          }
        }
        this.context.fillStyle = 'white';
      }
    }

    for(let index=0; index<this.rasporedStolova.objekti.length; index++){
      for(let index2=0; index2<this.rasporedStolova.objekti[index].stolovi.length; index2++){
        if(this.rasporedStolova.objekti[index].lokacija==izabranaLokacija){
          switch(this.rasporedStolova.objekti[index].stolovi[index2].idStola){
            case 1:
              this.context.fillStyle = 'black'
              this.context.font = "20px Arial";
              this.context.fillText("1", 105, 80);
              break;
            case 2:
              this.context.fillStyle = 'black'
              this.context.font = "20px Arial";
              this.context.fillText("2", 600, 90);
              break;
            case 3:
              this.context.fillStyle = 'black'
              this.context.font = "20px Arial";
              this.context.fillText("3", 150, 335);
              break;
            case 4:
              this.context.fillStyle = 'black'
              this.context.font = "20px Arial";
              this.context.fillText("4", 560, 325);
              break;
          }
        }
      }
    }
  }

  onTabChanged(event){
    //this.context = this.prikazStolova.nativeElement.getContext('2d');

    const canvas = <HTMLCanvasElement>(document.getElementById('canvas'+event.index));

    if(!canvas)return;

    this.context = canvas.getContext('2d');

    this.context.fillStyle = 'white';
    this.context.strokeStyle = 'black';
    this.context.rect(100, 60, 200, 150) // id1
    this.context.stroke();
    this.context.fill();
    
    this.context.beginPath();
    this.context.arc(650, 135, 80, 0, 2*Math.PI); //id2
    this.context.stroke();
    this.context.fill();

    this.context.beginPath();
    this.context.arc(200, 380, 80, 0, 2*Math.PI); //id3
    this.context.stroke();
    this.context.fill();

    this.context.rect(555, 305, 200, 150) //id4
    this.context.stroke();
    this.context.fill();

    this.context.fillStyle = 'black'
    this.context.font = "20px Arial";
    this.context.fillText("1", 105, 80);
    this.context.fillText("2", 600, 90);
    this.context.fillText("3", 150, 335);
    this.context.fillText("4", 560, 325);

    for(let index=0; index<this.rasporedStolova.objekti.length; index++){
      if(this.rasporedStolova.objekti[index].lokacija==this.rasporedStolovaIzabranaLokacija){
        this.racuniLokacije[index] = this.racuniTrenutneLokacije;
        break;
      }
    }

    for(let index=0; index<this.preduzece.kase.length; index++){
      if(this.preduzece.kase[index].lokacija==this.rasporedStolovaIzabranaLokacija){
        this.preduzece.kase[index].artikli = this.rasporedStolovaIzabranaLokacijaArtikli.artikli;
      }
    }

    this.rasporedStolovaIzabranaLokacija = event.tab.textLabel;

    for(let index=0; index<this.rasporedStolova.objekti.length; index++){
      if(this.rasporedStolova.objekti[index].lokacija==this.rasporedStolovaIzabranaLokacija){
        this.racuniTrenutneLokacije = this.racuniLokacije[index];
        this.rasporedStolovaIzabranaLokacijaArtikli = this.preduzece.kase.find(kasa=> kasa.lokacija==this.rasporedStolovaIzabranaLokacija);
        break;
      }
    }

    this.context.fillStyle = 'red';

    for(let index=0; index<this.rasporedStolova.objekti.length; index++){
      for(let index2=0; index2<this.rasporedStolova.objekti[index].stolovi.length; index2++){
        if(this.rasporedStolova.objekti[index].stolovi[index2].zauzet==true && this.rasporedStolova.objekti[index].lokacija==this.rasporedStolovaIzabranaLokacija){
          switch(this.rasporedStolova.objekti[index].stolovi[index2].idStola){
            case 1:
              this.context.fillText("Zauzet", 165, 140); // za id1
              break;
            case 2:
              this.context.fillText("Zauzet", 620, 140); // za id2
              break;
            case 3:
              this.context.fillText("Zauzet", 170, 385); // za id3
              break;
            case 4:
              this.context.fillText("Zauzet", 620, 385); // za id4
              break;
          }
        }
      }
    }
  }

  prikaziDialogPlacanjeRacunaStolovi(index){
    let dialogRef = this.dialog.open(this.dialogPlacanjeRacuna);
    let idStola = this.racuniTrenutneLokacije[index].idStola;
    let racun = this.racuniTrenutneLokacije[index].racun;

    this.racunZaPlacanje = racun;
    this.stoZaPlacanje = idStola;

    let nacinPlacanja = 0;

    switch(idStola){
      case 1:
        nacinPlacanja = this.nacinPlacanja1;
        break;
      case 2:
        nacinPlacanja = this.nacinPlacanja2;
        break;
      case 3:
        nacinPlacanja = this.nacinPlacanja3;
        break;
      case 4:
        nacinPlacanja = this.nacinPlacanja4;
        break;
    }

    dialogRef.afterClosed().subscribe(result=>{
      if(result != undefined){
        if(result == 'pay'){
          let datumIzvestaj = new Date();
          datumIzvestaj.setHours(0,0,0,0);

          if(nacinPlacanja==1){
            let date = new Date();
            racun.datum = date;
            racun.nacinPlacanja = "Gotovina";

            this.receiptService.addToDailyReport(this.preduzece.nazivPreduzeca, this.preduzece.pib, datumIzvestaj, racun.iznos, racun.pdv).subscribe(res=>{
              if(res['message']=='ok'){
                this.receiptService.addReceiptCash(racun, this.placeno, this.brojLK, this.placeno-racun.iznos).subscribe(res=>{
                  if(res['message']=='ok'){
                    this.userService.updateStorageStateLocation(this.preduzece.id, this.preduzece.kase).subscribe(res=>{
                      if(res['message']=='ok'){
                        switch(index){
                          case 0:
                            this.nacinPlacanja1 = 1;
                            break;
                          case 1:
                            this.nacinPlacanja2 = 1;
                            break;
                          case 2:
                            this.nacinPlacanja3 = 1;
                            break;
                          case 3:
                            this.nacinPlacanja4 = 1;
                            break;
                        }

                        this.racuniTrenutneLokacije[index].racun = null;

                        for(let index=0; index<this.rasporedStolova.objekti.length; index++){
                          let found = false;
                          for(let index2=0; index2<this.rasporedStolova.objekti[index].stolovi.length; index2++){
                            if(this.rasporedStolova.objekti[index].stolovi[index2].idStola==idStola && this.rasporedStolova.objekti[index].lokacija==this.rasporedStolovaIzabranaLokacija){
                              this.rasporedStolova.objekti[index].stolovi[index2].zauzet = false;
          
                              this.drawSlobodno(index, this.rasporedStolovaIzabranaLokacija);
          
                              found = true;
                            }
                            if(found) break;
                          }
                          if(found) break;
                        }
                      }
                    })
                  }
                })
              }
            })
          } else if(nacinPlacanja==2){
            let date = new Date();
            racun.datum = date;
            racun.nacinPlacanja = "Cek";

            this.receiptService.addToDailyReport(this.preduzece.nazivPreduzeca, this.preduzece.pib, datumIzvestaj, racun.iznos, racun.pdv).subscribe(res=>{
              if(res['message']=='ok'){
                this.receiptService.addReceiptCheck(racun, this.imeKupca, this.prezimeKupca, this.brojLK).subscribe(res=>{
                  if(res['message']=='ok'){
                    this.userService.updateStorageStateLocation(this.preduzece.id, this.preduzece.kase).subscribe(res=>{
                      if(res['message']=='ok'){
                        switch(index){
                          case 0:
                            this.nacinPlacanja1 = 1;
                            break;
                          case 1:
                            this.nacinPlacanja2 = 1;
                            break;
                          case 2:
                            this.nacinPlacanja3 = 1;
                            break;
                          case 3:
                            this.nacinPlacanja4 = 1;
                            break;
                        }

                        this.racuniTrenutneLokacije[index].racun = null;

                        for(let index=0; index<this.rasporedStolova.objekti.length; index++){
                          let found = false;
                          for(let index2=0; index2<this.rasporedStolova.objekti[index].stolovi.length; index2++){
                            if(this.rasporedStolova.objekti[index].stolovi[index2].idStola==idStola && this.rasporedStolova.objekti[index].lokacija==this.rasporedStolovaIzabranaLokacija){
                              this.rasporedStolova.objekti[index].stolovi[index2].zauzet = false;
          
                              this.drawSlobodno(index, this.rasporedStolovaIzabranaLokacija);
          
                              found = true;
                            }
                            if(found) break;
                          }
                          if(found) break;
                        }
                      }
                    })
                  }
                })
              }
            })
          } else if(nacinPlacanja==3){
            let date = new Date();
            racun.datum = date;
            racun.nacinPlacanja = "Kartica";

            this.receiptService.addToDailyReport(this.preduzece.nazivPreduzeca, this.preduzece.pib, datumIzvestaj, racun.iznos, racun.pdv).subscribe(res=>{
              if(res['message']=='ok'){
                this.receiptService.addReceiptCard(racun, this.brojLK, this.brojSlip).subscribe(res=>{
                  if(res['message']=='ok'){
                    this.userService.updateStorageStateLocation(this.preduzece.id, this.preduzece.kase).subscribe(res=>{
                      switch(index){
                        case 0:
                          this.nacinPlacanja1 = 1;
                          break;
                        case 1:
                          this.nacinPlacanja2 = 1;
                          break;
                        case 2:
                          this.nacinPlacanja3 = 1;
                          break;
                        case 3:
                          this.nacinPlacanja4 = 1;
                          break;
                      }

                      this.racuniTrenutneLokacije[index].racun = null;

                      for(let index=0; index<this.rasporedStolova.objekti.length; index++){
                        let found = false;
                        for(let index2=0; index2<this.rasporedStolova.objekti[index].stolovi.length; index2++){
                          if(this.rasporedStolova.objekti[index].stolovi[index2].idStola==idStola && this.rasporedStolova.objekti[index].lokacija==this.rasporedStolovaIzabranaLokacija){
                            this.rasporedStolova.objekti[index].stolovi[index2].zauzet = false;
        
                            this.drawSlobodno(index, this.rasporedStolovaIzabranaLokacija);
        
                            found = true;
                          }
                          if(found) break;
                        }
                        if(found) break;
                      }
                    })
                  }
                })
              }
            })
          } else if(nacinPlacanja==4){
            let iznosRabat = racun.iznos - (racun.iznos*(this.izabraniNarucioc.rabat/100));
            let pdvRabat = racun.pdv - (racun.pdv*(this.izabraniNarucioc.rabat/100));

            let date = new Date();
            racun.datum = date;
            racun.nacinPlacanja = "Virman";
            racun.iznos = iznosRabat;
            racun.pdv = pdvRabat;

            this.receiptService.addToDailyReport(this.preduzece.nazivPreduzeca, this.preduzece.pib, datumIzvestaj, racun.iznos, racun.pdv).subscribe(res=>{
              if(res['message']=='ok'){
                this.receiptService.addReceiptVirman(racun, this.izabraniNarucioc).subscribe(res=>{
                  if(res['message']=='ok'){
                    this.userService.updateStorageStateLocation(this.preduzece.id, this.preduzece.kase).subscribe(res=>{
                      if(res['message']=='ok'){
                        switch(index){
                          case 0:
                            this.nacinPlacanja1 = 1;
                            break;
                          case 1:
                            this.nacinPlacanja2 = 1;
                            break;
                          case 2:
                            this.nacinPlacanja3 = 1;
                            break;
                          case 3:
                            this.nacinPlacanja4 = 1;
                            break;
                        }
  
                        this.racuniTrenutneLokacije[index].racun = null;
  
                        for(let index=0; index<this.rasporedStolova.objekti.length; index++){
                          let found = false;
                          for(let index2=0; index2<this.rasporedStolova.objekti[index].stolovi.length; index2++){
                            if(this.rasporedStolova.objekti[index].stolovi[index2].idStola==idStola && this.rasporedStolova.objekti[index].lokacija==this.rasporedStolovaIzabranaLokacija){
                              this.rasporedStolova.objekti[index].stolovi[index2].zauzet = false;
          
                              this.drawSlobodno(index, this.rasporedStolovaIzabranaLokacija);
          
                              found = true;
                            }
                            if(found) break;
                          }
                          if(found) break;
                        }
                      }
                    })
                  }
                })
              }
            })
          }

          if(nacinPlacanja==1){
            this.placeno = 0;
            this.brojLK = "";
          } else if(nacinPlacanja==2){
            this.imeKupca = "";
            this.prezimeKupca = "";
            this.brojLK = "";
          } else if(nacinPlacanja==3){
            this.brojLK = "";
            this.brojSlip = "";
          } else if(nacinPlacanja==4){
            this.izabraniNarucioc = null;
          }
        } else if(result=='cancel'){
          if(nacinPlacanja==1){
            this.placeno = 0;
            this.brojLK = "";
          } else if(nacinPlacanja==2){
            this.imeKupca = "";
            this.prezimeKupca = "";
            this.brojLK = "";
          } else if(nacinPlacanja==3){
            this.brojLK = "";
            this.brojSlip = "";
          }
        }
      }
    })
  }


  //========================================================================================

  logout(){
    sessionStorage.removeItem('currentUser');
    this.ruter.navigate(['/login']);
  }


}
