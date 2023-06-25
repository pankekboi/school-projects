import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Enterprise } from '../models/enterprise';
import { Receipt } from '../models/receipt';
import { ReceiptService } from '../services/receipt.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-enterprise-reports',
  templateUrl: './enterprise-reports.component.html',
  styleUrls: ['./enterprise-reports.component.css']
})
export class EnterpriseReportsComponent implements OnInit {

  constructor(private userService: UserService, private receiptService: ReceiptService, private ruter: Router) { }

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
          this.danasnjiDatum = new Date();
          this.receiptService.getAllReceiptsToday(this.danasnjiDatum, ent.nazivPreduzeca).subscribe((racuni: Receipt[])=>{
            this.danasnjiRacuni = racuni;

            for(let index = 0; index < racuni.length; index++){
              this.ukupanIznosPazara += racuni[index].iznos + racuni[index].pdv;
              if(ent.uPDVsistemu){
                this.ukupanIznosPDV += racuni[index].pdv;
              }
            }
          })
        }
      })
    }
  }

  danasnjiRacuni: Receipt[];
  preduzece: Enterprise;
  danasnjiDatum: Date;
  ukupanIznosPazara: number = 0;
  ukupanIznosPDV: number = 0;

  logout(){
    sessionStorage.removeItem('currentUser');
    this.ruter.navigate(['/login']);
  }
}
