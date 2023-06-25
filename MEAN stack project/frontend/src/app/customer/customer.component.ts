import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Enterprise } from '../models/enterprise';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private ruter: Router, private userService: UserService) { }

  ngOnInit(): void {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

    if(currentUser==null){
      this.ruter.navigate(['/login']);
      return;
    } else if(currentUser.tip!=1){
      switch(currentUser.tip){
        case 0:
          this.ruter.navigate(['/admin']);
          return;;
        case 2:
          this.ruter.navigate(['/enterprise']);
          return;
      }
    } else {
      this.userService.getAllEnterprises().subscribe((enterprises: Enterprise[])=>{
        this.preduzeca = enterprises.filter(enterprise=> enterprise.kategorija!="");
        
        for(let index=0; index<enterprises.length; index++){
          if(enterprises[index].kategorija=='')continue;

          enterprises[index].magacini.forEach(magacin => {
            magacin.artikli.forEach(artikal => {
              if(artikal.stanje>0){
                let data = {
                  nazivPreduzeca: enterprises[index].nazivPreduzeca,
                  nazivArtikla: artikal.naziv,
                  proizvodjac: artikal.proizvodjac,
                  prodajnaCena: artikal.prodajnaCena,
                  nazivObjekta: magacin.naziv
                }
  
                this.preduzecaArtikli.push(data);
              }
            });
          });

          enterprises[index].kase.forEach(kasa=>{
            kasa.artikli.forEach(artikal=>{
              if(artikal.stanje>0){
                let data = {
                  nazivPreduzeca: enterprises[index].nazivPreduzeca,
                  nazivArtikla: artikal.naziv,
                  proizvodjac: artikal.proizvodjac,
                  prodajnaCena: artikal.prodajnaCena,
                  nazivObjekta: kasa.lokacija
                }
  
                this.preduzecaArtikli.push(data);
              }
            })
          })
        }

        this.preduzecaArtikliPrikaz = this.preduzecaArtikli;
      })
    }
  }

  preduzeca: Enterprise[];
  preduzecaArtikli = [];
  preduzecaArtikliPrikaz = [];

  pageEnterprises = 1;
  pageItems = 1;
  pageSize = 10;

  searchParam = "";

  search(){
    this.preduzecaArtikliPrikaz = this.preduzecaArtikli.filter(artikal=> artikal.proizvodjac.includes(this.searchParam) || artikal.nazivArtikla.includes(this.searchParam));
  }

  logout(){
    sessionStorage.removeItem('currentUser');
    this.ruter.navigate(['/login']);
  }
}
