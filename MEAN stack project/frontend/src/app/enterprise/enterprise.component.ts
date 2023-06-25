import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Enterprise } from '../models/enterprise';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})
export class EnterpriseComponent implements OnInit {

  constructor(private ruter: Router, private userServis: UserService, private modalService: NgbModal) { }

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

      this.userServis.getEnterpriseById(id).subscribe((ent: Enterprise)=>{
        if(ent){
          this.restoran = ent;
          this.logo = ent.logo;
  
          let ziroRacuni = ent.ziroRacuni.split(", ");
          this.racuni = ziroRacuni;
        }
      })
    }
  }

  errMsg1: string = "";
  errMsg2: string = "";
  errMsg3: string = "";

  restoran: Enterprise;
  logo: string;
  racuni: string[];

  trenutnaLozinka: string = "";
  novaLozinka1: string = "";
  novaLozinka2: string = "";

  valueChangeTrenutna(newValue){
    this.errMsg1 = "";
    this.trenutnaLozinka = newValue;

    if(this.trenutnaLozinka != this.restoran.password){
      this.errMsg1 = "Unesena lozinka se ne poklapa sa trenutnom lozinkom!";
      return;
    }
  }

  valueChangeNova1(newValue){
    this.errMsg2 = "";
    this.novaLozinka1 = newValue;

    const passwordRegex = /^(?=[A-Z]|[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.]).{8,12}$/
    let result = passwordRegex.test(this.novaLozinka1);
    if(!result){
      this.errMsg2 = "Nova lozinka nije u dobrom formatu!";
      return;
    }
  }

  valueChangeNova2(newValue){
    this.errMsg3 = "";
    this.novaLozinka2 = newValue;

    if(this.novaLozinka2 != this.novaLozinka1){
      this.errMsg3 = "Potvrda nove lozinke se ne poklapa sa novom lozinkom!"
      return;
    }
  }

  promeniLozinku(promenaLozinke){
    this.modalService.open(promenaLozinke, {ariaLabelledBy: 'modal-basic-title'}).result.then((result)=>{
      this.userServis.changePassword(this.restoran.id, this.novaLozinka1).subscribe(res=>{
        if(res['message']=='ok'){
          sessionStorage.removeItem('currentUser');
          this.ruter.navigate(['/login']);
          return;
        } else {
          alert("Dogodila se fatalna greska!")
        }
      })
    }).finally(()=>{
      this.trenutnaLozinka = '';
      this.novaLozinka1 = '';
      this.novaLozinka2 = '';
    })
  }

  logout(){
    sessionStorage.removeItem('currentUser');
    this.ruter.navigate(['/login']);
  }

}
