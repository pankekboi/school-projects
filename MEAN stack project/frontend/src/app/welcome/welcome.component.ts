import { Component, OnInit } from '@angular/core';
import { Receipt } from '../models/receipt';
import { WelcomeService } from '../services/welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private welcomeService: WelcomeService) { }

  ngOnInit(): void {
    this.welcomeService.getAllReceipts().subscribe((receipts: Receipt[])=>{
      if(receipts){
        this.allReceipts = receipts;

        for (let index = 0; index < this.allReceipts.length; index++) {
          // const[str1, str2] = this.allReceipts[index].datum.split('T');
          // const[year, month, day] = str1.split('-');
          // const[time, dummy] = str2.split('Z');
          // const[hour, minutes, seconds] = time.split(':');

          // this.allReceipts[index].datum = new Date(year, month-1, day, hour, minutes, seconds);

          this.allReceipts[index].datum = new Date(this.allReceipts[index].datum);
        }

        this.allReceipts.sort((a,b)=>{
          if(a.datum<b.datum){
            return 1;
          } else {
            if(a.datum==b.datum){
              return 0;
            }
            else {
              return -1;
            }
          }
        })

        for (let index = 0; index < 5; index++) {
          if(index < 3 && index < this.allReceipts.length){
            this.row1Data.push(this.allReceipts[index]);
          } else if(index >= 3 && index < this.allReceipts.length){
            this.row2Data.push(this.allReceipts[index]);
          }
        }
      }
    })
  }

  allReceipts = [];
  row1Data = [];
  row2Data = [];
}
