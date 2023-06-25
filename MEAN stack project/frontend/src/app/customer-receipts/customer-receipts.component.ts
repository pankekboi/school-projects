import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';
import { Receipt } from '../models/receipt';
import { ReceiptCard } from '../models/receiptCard';
import { ReceiptCash } from '../models/receiptCash';
import { ReceiptCheck } from '../models/receiptCheck';
import { ReceiptService } from '../services/receipt.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-customer-receipts',
  templateUrl: './customer-receipts.component.html',
  styleUrls: ['./customer-receipts.component.css']
})
export class CustomerReceiptsComponent implements OnInit {

  @ViewChild('dialogDetaljiRacuna') dialogDetaljiRacuna: TemplateRef<any>;

  constructor(private ruter: Router, private userService: UserService, private receiptService: ReceiptService, private dialog: MatDialog) { }

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
      let id = currentUser.id;

      this.userService.getCustomer(id).subscribe((kupac: Customer)=>{
        this.kupac = kupac;

        this.receiptService.getAllReceiptsForCustomer(kupac.brojLK).subscribe(res=>{
          this.racuni = res['mojiRacuni'];
          this.racuniKes = res['racuniKes'];
          this.racuniKartica = res['racuniKartica'];
          this.racuniCek = res['racuniCek'];

          this.racuni.forEach(racun => {
            racun.datum = new Date(racun.datum);
          });
        })
      })
    }
  }

  kupac: Customer;
  racuni: Receipt[];
  racuniKes: ReceiptCash[];
  racuniKartica: ReceiptCard[];
  racuniCek: ReceiptCheck[];

  racun: Receipt;
  racunKes: ReceiptCash;
  racunKartica: ReceiptCard;
  racunCek: ReceiptCheck;

  page = 1;
  pageSize = 20;

  prikaziDialogDetaljiRacuna(racun){
    switch(racun.nacinPlacanja){
      case 'Gotovina':
        this.racun = this.racuni.find(r=> r._id==racun._id);
        this.racunKes = this.racuniKes.find(kes=> kes._id==racun._id);
        break;
      case 'Cek':
        this.racun = this.racuni.find(r=> r._id==racun._id);
        this.racunCek = this.racuniCek.find(cek=> cek._id==racun._id);
        break;
      case 'Kartica':
        this.racun = this.racuni.find(r=> r._id==racun._id);
        this.racunKartica = this.racuniKartica.find(kartica=> kartica._id==racun._id);
        break;
    }

    let dialogRef = this.dialog.open(this.dialogDetaljiRacuna);
  }

  logout(){
    sessionStorage.removeItem('currentUser');
    this.ruter.navigate(['/login']);
  }
}
