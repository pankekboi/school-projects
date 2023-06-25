import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { Enterprise } from '../models/enterprise';
import { EnterpriseCategories } from '../models/enterpriseCategories';
import { Item } from '../models/item';
import { CategoryService } from '../services/category.service';
import { UserService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-enterprise-item-categories',
  templateUrl: './enterprise-item-categories.component.html',
  styleUrls: ['./enterprise-item-categories.component.css']
})
export class EnterpriseItemCategoriesComponent implements OnInit {

  constructor(private userService: UserService, private categoryService: CategoryService, private ruter: Router, private modalService: NgbModal) { }

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

          let found = false;

          for (let index = 0; index < ent.magacini.length; index++) {
            for(let index2 = 0; index2 < ent.magacini[index].artikli.length; index2++){
              for(let index3 = 0; index3 < this.artikli.length; index3++){
                if(this.artikli[index3].sifra==ent.magacini[index].artikli[index2].sifra) {
                  found = true;
                  break;
                }
              }
              if(found){
                found = false;
              }
              else{
                this.artikli.push(ent.magacini[index].artikli[index2]);
              }
            }
          }

          this.artikliPretraga = this.artikli;

          this.categoryService.getAllCategories(id).subscribe((categories: EnterpriseCategories)=>{
            if(categories){
              this.kategorije = categories.kategorije;
            } else this.kategorije = [];
          })
        }
      })
    }
  }

  preduzece: Enterprise;
  kategorije: Category[];
  artikli: Item[] = [];
  artikliPretraga: Item[] = [];
  errMsg: string = "";

  novaKategorija: string = "";
  paramPretrage: string = "";
  izabraniArtikal: Item = null;

  valueChangeParamPretrage(newValue){
    this.paramPretrage = newValue;

    this.artikliPretraga = this.artikli.filter(artikal=> artikal.naziv.includes(this.paramPretrage));
  }

  promeniArtikal(artikal){
    this.izabraniArtikal = artikal;
  }

  logout(){
    sessionStorage.removeItem('currentUser');
    this.ruter.navigate(['/login']);
  }

  dodajKategoriju(){
    this.errMsg = "";

    if(this.novaKategorija==""){
      this.errMsg = "Ime kategorije mora da se unese!";
      return;
    }

    this.categoryService.addCategory(this.preduzece.id, this.novaKategorija).subscribe(res=>{
      if(res['message']=='ok'){
        this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
          this.ruter.navigate(['/enterpriseItemCategories']);
        });
      } else if(res['message'] == 'greska'){
        alert("Dogodila se greska! Zeljena kategorija nije ubacena u bazu!")
      }
    })
  }

  birajArtikal(biranjeArtikla, nazivKategorije){
    this.errMsg = "";
    let naziv = nazivKategorije;

    this.modalService.open(biranjeArtikla, {ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static'}).result.then((result)=>{
      this.categoryService.addItemToCategory(this.preduzece.id, naziv, this.izabraniArtikal).subscribe(res=>{
        if(res['message']=='ok'){
          alert("Artikal je uspesno dodat u kategoriju " + naziv);
          return;
        } else if(res['message']=='postoji artikal u kategoriji'){
          alert("Artikal vec postoji u kategoriji " + res['kategorija'])
          return;
        }
      })
    })
  }
}
