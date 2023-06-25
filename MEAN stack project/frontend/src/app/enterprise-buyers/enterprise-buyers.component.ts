import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Buyers } from '../models/buyers';
import { Enterprise } from '../models/enterprise';
import { BuyersService } from '../services/buyers.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-enterprise-buyers',
  templateUrl: './enterprise-buyers.component.html',
  styleUrls: ['./enterprise-buyers.component.css']
})
export class EnterpriseBuyersComponent implements OnInit {

  constructor(private ruter: Router, private userService: UserService, private buyersService: BuyersService) { }

  ngOnInit(): void {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

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
          this.restoran = ent;
          this.buyersService.getAllBuyers(id).subscribe((buyers: Buyers)=>{
            if(buyers){
              this.buyers = buyers;
            } else{
              this.buyers = null;
            }
          })
        }
      })
    }
  }
  restoran: Enterprise;
  buyers: Buyers;
  errMsg: string = "";
  errMsg2: string = "";

  ime: string = "";
  prezime: string = "";
  username: string = "";
  telefon: string = "";
  email : string = "";
  nazivPreduzeca: string = "";
  adresaPreduzeca: string = "";
  pib: string = "";
  maticniBroj: string = "";
  brojDanaZaPlacanje: number = 0;
  rabat: number = 0;

  pib2: string = "";
  brojDanaZaPlacanje2: number = 0;
  rabat2: number = 0;

  logout(){
    sessionStorage.removeItem('currentUser');
    this.ruter.navigate(['/login']);
  }

  dodajNaruciocaForma(){
    this.errMsg = "";
    if(this.ime=="" || this.prezime=="" || this.username=="" || this.telefon=="" || this.email=="" || this.nazivPreduzeca=="" || this.adresaPreduzeca=="" || this.pib=="" || this.maticniBroj==""){
      this.errMsg = "Sva polja za dodavanje narucioca su obavezna!";
      return;
    }

    if(this.brojDanaZaPlacanje<=0){
      this.errMsg = "Broj dana za placanje ne sme da bude manji, niti jednak 0!";
      return;
    }

    if(this.rabat<0 || this.rabat>100){
      this.errMsg = "Rabat se izrazava u procentima i dozvoljene su vrednosti od 0 do 100!";
      return;
    }

    this.userService.getEnterprise(this.ime, this.prezime, this.username, this.telefon, this.email, this.nazivPreduzeca, this.adresaPreduzeca, this.pib, this.maticniBroj).subscribe((ent: Enterprise)=>{
      if(ent){
        this.buyersService.addBuyer(this.restoran.id, this.pib, this.brojDanaZaPlacanje, this.rabat).subscribe(res=>{
          if(res['message']=='ok'){
            alert("Uspesno ste dodali novog narucioca!");
            this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
              this.ruter.navigate(['/enterpriseBuyers']);
            });
          } else {
            alert('Dogodila se greska i novi narucioc nije dodat u bazu!')
          }
        })
      } else {
        this.errMsg = "Trazeno preduzece ne postoji u bazi podataka!";
        return;
      }
    })
  }

  dodajNaruciocaPIB(){
    this.errMsg2 = "";
    if(this.pib2==""){
      this.errMsg2 = "Sva polja za dodavanje narucioca su obavezna!";
      return;
    }

    if(this.brojDanaZaPlacanje2<=0){
      this.errMsg2 = "Broj dana za placanje ne sme da bude manji, niti jednak 0!";
      return;
    }

    if(this.rabat2<0 || this.rabat2>100){
      this.errMsg2 = "Rabat se izrazava u procentima i dozvoljene su vrednosti od 0 do 100!";
      return;
    }

    this.userService.getEnterpriseByPIB(this.pib2).subscribe((ent: Enterprise)=>{
      if(ent){
        this.buyersService.addBuyer(this.restoran.id, this.pib2, this.brojDanaZaPlacanje2, this.rabat2).subscribe(res=>{
          if(res['message']=='ok'){
            alert("Uspesno ste dodali novog narucioca!");
            this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
              this.ruter.navigate(['/enterpriseBuyers']);
            });
          } else {
            alert('Dogodila se greska i novi narucioc nije dodat u bazu!')
          }
        })
      } else {
        this.errMsg2 = "Trazeno preduzece ne postoji u bazi podataka!";
        return;
      }
    })
  }
}
