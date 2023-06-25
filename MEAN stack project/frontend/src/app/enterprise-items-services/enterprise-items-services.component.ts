import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Enterprise } from '../models/enterprise';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';
import { UserService } from '../services/user.service';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EnterpriseItems } from '../models/enterpriseItems';
import { ItemBasic } from '../models/itemBasic';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-enterprise-items-services',
  templateUrl: './enterprise-items-services.component.html',
  styleUrls: ['./enterprise-items-services.component.css']
})
export class EnterpriseItemsServicesComponent implements OnInit {

  @ViewChild('dialogArtikalNijeIzabran') dialogArtikalNijeIzabran: TemplateRef<any>;
  @ViewChild('dialogPotvrdaBrisanjaArtikla') dialogPotvrdaBrisanjaArtikla: TemplateRef<any>;

  constructor(private userService: UserService, private ruter: Router, private itemService: ItemService, private dialog: MatDialog, private fb: FormBuilder) { }

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
    } else{
      let id = currentUser.id;

      this.userService.getEnterpriseById(id).subscribe((ent: Enterprise)=>{
        if(ent){
          this.restoran = ent;

          for(let index=0; index<ent.magacini.length; index++){
            let data = {
              id: ent.magacini[index].id,
              naziv: ent.magacini[index].naziv
            }

            this.magaciniDropdown.push(data);
          }

          let idLok = 1;
          for(let index=0; index<ent.kase.length; index++){
            let data = {
              idLok: idLok,
              lokacija: ent.kase[index].lokacija
            }

            idLok++;

            this.lokacijeDropdown.push(data);
          }

          this.dropdownSettingsMagacini = {
            idField: 'id',
            textField: 'naziv',
            enableCheckAll: false
          }

          this.dropdownFormMagacini = this.fb.group({
            dropdownMagacini: [this.magaciniDropdownSelected]
          })

          this.dropdownSettingsLokacije = {
            idField: 'idLok',
            textField: 'lokacija',
            enableCheckAll: false
          }

          this.dropdownFormLokacije = this.fb.group({
            dropdownLokacije: [this.lokacijeDropdownSelected]
          })

          this.itemService.getAllItems(ent.id).subscribe((res: EnterpriseItems)=>{
            if(res){
              this.artikliPrikaz = res.artikli;

            }
          })
        }
      })
    }
  }

  magaciniDropdown = [];
  dropdownSettingsMagacini: IDropdownSettings={};
  dropdownFormMagacini: FormGroup;
  artikliPrikaz: ItemBasic[] = [];
  magaciniDropdownSelected = [];

  lokacijeDropdown = [];
  dropdownSettingsLokacije: IDropdownSettings={};
  dropdownFormLokacije: FormGroup;
  lokacijeDropdownSelected = [];

  artikli: Item[] = [];
  restoran: Enterprise;
  izabranArtikal: Item = null;

  errMsg1: string = "";
  errMsg2: string = "";

  sifraUnos: string = "";
  nazivUnos: string = "";
  jedinicaMereUnos: string = "";
  stopaPorezaUnos: number = undefined;
  proizvodjacUnos: string = "";
  tipUnos: string = "";
  nabavnaUnos: number = 0;
  prodajnaUnos: number = 0;
  stanjeUnos: number = 0;
  minKolicinaUnos: number = 0;
  maxKolicinaUnos: number = 0;
  magacinUnos: string = "";

  sifraIzmena: string = "";
  sifraIzmenaTrenutni: string = "";
  nazivIzmena: string = "";
  jedinicaMereIzmena: string = "";
  stopaPorezaIzmena: number = undefined;
  proizvodjacIzmena: string = "";
  tipIzmena: string = "";
  nabavnaIzmena: number = 0;
  prodajnaIzmena: number = 0;
  stanjeIzmena: number = 0;
  minKolicinaIzmena: number = 0;
  maxKolicinaIzmena: number = 0;
  magacinIzmena: string = "";
  magacinIzmenaTrenutni: string = "";

  page = 1;
  pageSize = 10;

  unos: boolean = false;
  izmena: boolean = false;

  opsta = "20";
  posebna = "10";

  defaultSlicica: string = "data:image/png;base64,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";
  izabranaSlicica: string = "";
  izabranaSlicicaStara: string = "";
  izabraniFajl: File = null;

  sviObjekti;

  promeniArtikal(artikal){
    let found = false;
    for(let index=0; index<this.restoran.magacini.length; index++){
      for(let index2=0; index2<this.restoran.magacini[index].artikli.length; index2++){
        if(artikal.sifra==this.restoran.magacini[index].artikli[index2].sifra){
          this.izabranArtikal = this.restoran.magacini[index].artikli[index2];
          found = true;
        }

        if(found)break;
      }
      if(found)break;
    }

    if(!found){
      for(let index = 0; index<this.restoran.kase.length; index++){
        for(let index2=0; index2<this.restoran.kase[index].artikli.length; index2++){
          if(artikal.sifra==this.restoran.kase[index].artikli[index2].sifra){
            this.izabranArtikal = this.restoran.kase[index].artikli[index2];
            found = true;
          }

          if(found)break;
        }
        if(found)break;
      }
    }

    this.sifraIzmena = this.izabranArtikal.sifra;
    this.sifraIzmenaTrenutni = this.sifraIzmena;
    this.nazivIzmena = this.izabranArtikal.naziv;
    this.jedinicaMereIzmena = this.izabranArtikal.jedinicaMere;
    if(this.restoran.uPDVsistemu){
      this.stopaPorezaIzmena = this.izabranArtikal.poreskaStopa;
    }
    this.proizvodjacIzmena = this.izabranArtikal.proizvodjac;
    if(this.restoran.kategorija=="Ugostiteljski objekat"){
      this.tipIzmena = this.izabranArtikal.tip;
    }
    this.nabavnaIzmena = this.izabranArtikal.nabavnaCena;
    this.prodajnaIzmena = this.izabranArtikal.prodajnaCena;
    this.stanjeIzmena = this.izabranArtikal.stanje;
    this.minKolicinaIzmena = this.izabranArtikal.minKolicina;
    this.maxKolicinaIzmena = this.izabranArtikal.maxKolicina;
    this.izabranaSlicicaStara = this.izabranArtikal.slicica;
  }

  izmeniStopuPoreza(value){
    if(value==1){
      this.stopaPorezaIzmena = 20;
    } else if(value==2){
      this.stopaPorezaIzmena = 10;
    }
  }

  izmeniTipArtikla(value){
    if(value==1){
      this.tipIzmena = 'hrana';
    } else if(value==2){
      this.tipIzmena = 'pice';
    } else if(value==3){
      this.tipIzmena = 'sirovina';
    }
  }

  prikaziUnos(){
    this.unos = true;

    let returnArray = [];

    let magacini = this.restoran.magacini;
    let lokacije = this.restoran.kase;

    for (let index = 0; index < magacini.length; index++) {
      for(let index2 = 0; index2 < magacini[index].artikli.length; index2++){
          let data = {
              naziv: magacini[index].naziv,
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
          let data = {
              naziv: lokacije[index].lokacija,
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

    this.sviObjekti = returnArray;

    this.izmena = false;
  }

  prikaziIzmenu(){
    this.unos = false;

    // dohvatanje svih artikala iz magacina i objekata
    let returnArray = [];

    let magacini = this.restoran.magacini;
    let lokacije = this.restoran.kase;

    for (let index = 0; index < magacini.length; index++) {
      for(let index2 = 0; index2 < magacini[index].artikli.length; index2++){
          let data = {
              naziv: magacini[index].naziv,
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
          let data = {
              naziv: lokacije[index].lokacija,
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

    this.sviObjekti = returnArray;
    this.izmena = true;
  }

  onFileChanged(event){
    this.izabraniFajl = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (e:any)=>{
      const img = new Image();
      this.izabranaSlicica = e.target.result;
    }

    reader.readAsDataURL(this.izabraniFajl);
  }

  onItemSelect(event){
    this.magaciniDropdownSelected.push(event);
  }

  onItemDeSelect(event){
    for(let index=0; index<this.magaciniDropdownSelected.length; index++){
      if(this.magaciniDropdownSelected[index].id==event.id){
        this.magaciniDropdownSelected.splice(index,1);
      }
    }
  }

  onItemSelectLokacije(event){
    this.lokacijeDropdownSelected.push(event);
  }

  onItemDeSelectLokacije(event){
    for(let index=0; index<this.lokacijeDropdownSelected.length; index++){
      if(this.lokacijeDropdownSelected[index].lokacija==event.lokacija){
        this.lokacijeDropdownSelected.splice(index,1);
      }
    }
  }

  logout(){
    sessionStorage.removeItem('currentUser');
    this.ruter.navigate(['/login']);
  }

  unesiArtikal(){

    if(this.sifraUnos=="" || this.nazivUnos=="" || this.jedinicaMereUnos=="" || (this.stopaPorezaUnos==undefined && this.restoran.uPDVsistemu==true) || this.proizvodjacUnos==""){
      this.errMsg1 = "Sve osnovne informacije o artiklu moraju da se popune!";
      return;
    }

    if(this.restoran.kategorija=="Ugostiteljski objekat"){
      if(this.tipUnos==""){
        this.errMsg1 = "Sve osnovne informacije o artiklu moraju da se popune!";
      return;
      }
    }

    if(this.nabavnaUnos<=0 || this.prodajnaUnos<=0 || this.stanjeUnos<=0 || this.minKolicinaUnos<=0 || this.maxKolicinaUnos<=0){
      this.errMsg1 = "Sve informacije za cenu artikla moraju da budu vece od 0!";
      return;
    }

    if(this.magaciniDropdownSelected.length==0 || this.lokacijeDropdownSelected.length==0){
      this.errMsg1 = "Mora da se definise bar jedna lokacija za smestanje artikla!";
      return;
    }

    if(this.stanjeUnos<this.minKolicinaUnos){
      this.errMsg1 = "Stanje koje se unosi mora da bude vece ili jednako minimalnoj zeljenoj kolicini!";
      return;
    }

    if(this.stanjeUnos>this.maxKolicinaUnos){
      this.errMsg1 = "Stanje koje se unosi mora da bude manje ili jednako maksimalnoj zeljenoj kolicini!";
      return;
    }

    if(this.minKolicinaUnos>this.maxKolicinaUnos){
      this.errMsg1 = "Minimalna zeljena kolicina mora da bude manja ili jednaka maksimalnoj zeljenoj kolicini!";
    }

    let slicica;
    if(this.izabraniFajl==null){
      slicica = this.defaultSlicica;
    } else slicica = this.izabranaSlicica;

    let data;
    if(this.restoran.kategorija=="Ugostiteljski objekat"){
      data = {
        idPreduzeca: this.restoran.id,
        magacini: this.magaciniDropdownSelected,
        lokacije: this.lokacijeDropdownSelected,
        sifra: this.sifraUnos,
        naziv: this.nazivUnos,
        jedinicaMere: this.jedinicaMereUnos,
        stopaPoreza: this.stopaPorezaUnos,
        proizvodjac: this.proizvodjacUnos,
        tip: this.tipUnos,
        nabavnaCena: this.nabavnaUnos,
        prodajnaCena: this.prodajnaUnos,
        stanje: this.stanjeUnos,
        minKolicina: this.minKolicinaUnos,
        maxKolicina: this.maxKolicinaUnos,
        slicica: slicica
      }
    } else {
      data = {
        idPreduzeca: this.restoran.id,
        magacini: this.magaciniDropdownSelected,
        lokacije: this.lokacijeDropdownSelected,
        sifra: this.sifraUnos,
        naziv: this.nazivUnos,
        jedinicaMere: this.jedinicaMereUnos,
        stopaPoreza: this.stopaPorezaUnos,
        proizvodjac: this.proizvodjacUnos,
        nabavnaCena: this.nabavnaUnos,
        prodajnaCena: this.prodajnaUnos,
        stanje: this.stanjeUnos,
        minKolicina: this.minKolicinaUnos,
        maxKolicina: this.maxKolicinaUnos,
        slicica: slicica
      }
    }

    this.itemService.addItem(data).subscribe(res=>{
      if(res['message']=='ok'){
        alert("Artikal je uspesno dodat u bazu!");
        this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
          this.ruter.navigate(['/enterpriseItemsServices']);
        });
      } else if(res['message']=='sifra vec postoji'){
        alert("Artikal sa unetom sifrom vec postoji u sistemu!");
        return;
      }
      else {
        alert("Dogodila se greska i artikal nije dodat u bazu!");
        return;
      }
    })
  }

  izmeniArtikal(){
    if(this.sifraIzmena=="" || this.nazivIzmena=="" || this.jedinicaMereIzmena=="" || (this.stopaPorezaUnos==undefined && this.restoran.uPDVsistemu==true) || this.proizvodjacIzmena==""){
      this.errMsg2 = "Sve osnovne informacije o artiklu moraju da se popune!";
      return;
    }

    if(this.restoran.kategorija=="Ugostiteljski objekat"){
      if(this.tipIzmena==""){
        this.errMsg2 = "Sve osnovne informacije o artiklu moraju da se popune!";
      return;
      }
    }

    if(this.nabavnaIzmena<=0 || this.prodajnaIzmena<=0 || this.stanjeIzmena<=0 || this.minKolicinaIzmena<=0 || this.maxKolicinaIzmena<=0){
      this.errMsg2 = "Sve informacije za cenu artikla moraju da budu vece od 0!";
      return;
    }

    if(this.stanjeIzmena<this.minKolicinaIzmena){
      this.errMsg2 = "Stanje koje se unosi mora da bude vece ili jednako minimalnoj zeljenoj kolicini!";
      return;
    }

    if(this.stanjeIzmena>this.maxKolicinaIzmena){
      this.errMsg2 = "Stanje koje se unosi mora da bude manje ili jednako maksimalnoj zeljenoj kolicini!";
      return;
    }

    if(this.minKolicinaIzmena>this.maxKolicinaIzmena){
      this.errMsg2 = "Minimalna zeljena kolicina mora da bude manja ili jednaka maksimalnoj zeljenoj kolicini!";
    }

    let slicica;
    if(this.izabraniFajl==null && this.izabranaSlicicaStara==this.defaultSlicica){
      slicica = this.defaultSlicica;
    } else if(this.izabraniFajl!=null){
      slicica = this.izabranaSlicica;
    } else {
      slicica = this.izabranaSlicicaStara;
    }

    let data;
    if(this.restoran.kategorija=="Ugostiteljski objekat"){
      data = {
        idPreduzeca: this.restoran.id,
        sifraTrenutni: this.sifraIzmenaTrenutni,
        sifra: this.sifraIzmena,
        naziv: this.nazivIzmena,
        jedinicaMere: this.jedinicaMereIzmena,
        stopaPoreza: this.stopaPorezaIzmena,
        proizvodjac: this.proizvodjacIzmena,
        tip: this.tipIzmena,
        nabavnaCena: this.nabavnaIzmena,
        prodajnaCena: this.prodajnaIzmena,
        stanje: this.stanjeIzmena,
        minKolicina: this.minKolicinaIzmena,
        maxKolicina: this.maxKolicinaIzmena,
        slicica: slicica
      }
    } else {
      data = {
        idPreduzeca: this.restoran.id,
        sifraTrenutni: this.sifraIzmenaTrenutni,
        sifra: this.sifraIzmena,
        naziv: this.nazivIzmena,
        jedinicaMere: this.jedinicaMereIzmena,
        stopaPoreza: this.stopaPorezaIzmena,
        proizvodjac: this.proizvodjacIzmena,
        nabavnaCena: this.nabavnaIzmena,
        prodajnaCena: this.prodajnaIzmena,
        stanje: this.stanjeIzmena,
        minKolicina: this.minKolicinaIzmena,
        maxKolicina: this.maxKolicinaIzmena,
        slicica: slicica
      }
    }

    this.itemService.changeItem(data).subscribe(res=>{
      if(res['message']=='ok'){
        alert("Izmene su uspesno sacuvane.");
        this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
          this.ruter.navigate(['/enterpriseItemsServices']);
        });
      }
      else {
        alert("Dogodila se greska i artikal nije izmenjen!");
        return;
      }
    })
  }

  prikaziDialogArikalNijeIzabran(){
    let dialogRef = this.dialog.open(this.dialogArtikalNijeIzabran);
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        console.log("Korisnik zatvorio dijalog kao potvrdu");
      }
    })
  }

  prikaziDialogPotvrdaBrisanja(){
    let dialogRef = this.dialog.open(this.dialogPotvrdaBrisanjaArtikla);
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        if(result == 'ne') return;
        else if(result == 'da'){
          const data = {
            idPreduzeca: this.restoran.id,
            artikal: this.izabranArtikal
          }

          this.itemService.removeItem(data).subscribe(res=>{
            if(res['message']=='ok'){
              this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
                this.ruter.navigate(['/enterpriseItemsServices']);
              });
            } else {
              console.log("Dogodila se greska");
            }
          })
        }
      }
    })
  }

  izbrisiArtikal(){
    if(this.izabranArtikal==null){
      this.prikaziDialogArikalNijeIzabran();
      return;
    }

    this.prikaziDialogPotvrdaBrisanja();
  }
}
