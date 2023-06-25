import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Enterprise } from '../models/enterprise';
import { Storage } from '../models/storage';
import { cashRegister } from '../models/cashRegister';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private modalService: NgbModal) {  }

  ngOnInit(): void {
    this.magacini = [new Storage()];
    this.kase = [new cashRegister()];
    this.tipoviKasa = ["Galeb GE 10 Box", "Galeb N910 Pro", "Galeb CPOS X5", "Galeb LPFR", "eFiskal HCC-Z100", "eFiskal Saturn 1000", "eFiskal N910 PRO"];
  }

  username: string;
  password: string;
  errorMsg: string;

  brojMagacina: number = 1;
  magacini: Array<Storage>;

  brojKasa: number = 1;
  kase: Array<cashRegister>;
  tipoviKasa: Array<String>;

  kategorija: string = "";
  sifreDelatnosti: string = "";
  ziroRacuni: string = "";
  uPDVsistemu: boolean = false;

  valueChangeStorage(newValue){
    this.magacini = [];
    this.brojMagacina = newValue;
    for (let index = 0; index < newValue; index++) {
      let storage = new Storage();
      this.magacini.push(storage);
    }
  }

  valueChangeRegisters(newValue){
    this.kase = [];
    this.brojKasa = newValue;
    for(let index = 0; index < newValue; index++){
      let register = new cashRegister();
      this.kase.push(register);
    }
  }

  login(forma){
    this.errorMsg = "";
    this.userService.login(this.username, this.password).subscribe((user: User)=>{
      if(user){
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        if(user.tip==0){
          this.errorMsg = "Greska! Administrator ne moze da se prijavi preko ove forme!";
          sessionStorage.removeItem("currentUser");
          return;
        } else if(user.tip==1){
          this.router.navigate(['/customer']);
        } else {
          let id = user.id;

          this.userService.getEnterpriseById(id).subscribe((enterprise: Enterprise)=>{
            if(enterprise.kategorija==""){
              this.modalService.open(forma, {ariaLabelledBy: 'modal-basic-title'}).result.then((result)=>{
                if(this.kategorija=="" || this.sifreDelatnosti==""){
                  this.errorMsg = "Sve dodatne informacije su obavezne i sva polja moraju da budu popunjena!";
                  sessionStorage.removeItem('currentUser');
                  return;
                }

                for (let index = 0; index < this.magacini.length; index++) {
                  if(this.magacini[index].id==undefined || this.magacini[index].id=="" || this.magacini[index].naziv==undefined || this.magacini[index].naziv==""){
                    this.errorMsg = "Sve dodatne informacije su obavezne i sva polja moraju da budu popunjena! U pitanju su nizovi";
                    sessionStorage.removeItem('currentUser');
                    return;
                  }
                }
                
                for (let index = 0; index < this.kase.length; index++) {
                  if(this.kase[index].lokacija==undefined || this.kase[index].lokacija=="" || this.kase[index].tip==undefined || this.kase[index].tip==""){
                    this.errorMsg = "Sve dodatne informacije su obavezne i sva polja moraju da budu popunjena! U pitanju su nizovi";
                    sessionStorage.removeItem('currentUser');
                    return;
                  }
                }

                if(this.kategorija!="Prodavnica" && this.kategorija!="Ugostiteljski objekat"){
                  this.errorMsg = "Kategorija preduzeca moze biti samo 'Prodavnica' ili 'Ugostiteljski objekat!'";
                  sessionStorage.removeItem('currentUser');
                  return;
                }

                const sifreRegex = /^([0-9]{4}((\,)? [0-9]{4}){0,})$/;
                let resultSifre = sifreRegex.test(this.sifreDelatnosti);
                if(!resultSifre){
                  this.errorMsg = "Sifra delatnosti nije u dobrom formatu! Proverite format i pokusajte ponovo.";
                  sessionStorage.removeItem('currentUser');
                  return;
                }

                const ziroRacuniRegex = /^([0-9]{3}-[0-9]{12}-[0-9]{2}((\,) [0-9]{3}-[0-9]{12}-[0-9]{2}){0,})$/;
                let resultZiroRacuni = ziroRacuniRegex.test(this.ziroRacuni);
                if(!resultZiroRacuni){
                  this.errorMsg = "Ziro racun nije u dobrom formatu! Proverite format i pokusajte ponovo.";
                  sessionStorage.removeItem('currentUser');
                  return;
                }

                const idRegex = /^[0-9]{1,}$/
                for (let index = 0; index < this.magacini.length; index++) {
                  let resultID = idRegex.test(this.magacini[index].id);
                  if(!resultID){
                    this.errorMsg = "Identifikator magacina se iskljucivo sastoji od proizvoljnog broja cifara!";
                    sessionStorage.removeItem('currentUser');
                    return;
                  }
                }
                
                this.userService.updateEnterpriseData(id, this.kategorija, this.sifreDelatnosti, this.ziroRacuni, this.uPDVsistemu, this.magacini, this.kase).subscribe(res=>{
                  if(res['message']=='ok'){
                    this.router.navigate(['/enterprise']);
                  }
                })
                return;
              });
            } else{
              this.router.navigate(['/enterprise']);
            }
          })
        }
      } else {
        this.errorMsg = "Greska! Korisnik ne postoji u bazi ili podaci nisu dobro uneti!";
      }
    })
  }
}
