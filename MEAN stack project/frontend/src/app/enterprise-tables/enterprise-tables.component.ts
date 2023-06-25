import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Enterprise } from '../models/enterprise';
import { TableArangements } from '../models/tableArangements';
import { EnterpriseTablesService } from '../services/enterprise-tables.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-enterprise-tables',
  templateUrl: './enterprise-tables.component.html',
  styleUrls: ['./enterprise-tables.component.css']
})
export class EnterpriseTablesComponent implements OnInit {

  constructor(private ruter: Router, private userService: UserService, private tableService: EnterpriseTablesService) { }

  @ViewChild('prikazStolova') prikazStolova: ElementRef<HTMLCanvasElement>;

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
          if(ent.kategorija!="Ugostiteljski objekat"){
            this.ruter.navigate['/enterprise']
            return;
          }

          this.preduzece = ent;

          this.tableService.getAllLocations(ent.id).subscribe((arng: TableArangements)=>{
            if(arng){
              this.rasporedStolova = arng;
              
              for(let index=0; index<this.rasporedStolova.objekti.length; index++){
                this.links.push(this.rasporedStolova.objekti[index].lokacija);
              }

              this.activeLink = this.rasporedStolova.objekti[0].lokacija;
              this.prikaziRaspored = true;
            } 
            else this.rasporedStolova = null;
          })
        }
      })
    }
  }

  preduzece: Enterprise;
  rasporedStolova: TableArangements;

  links = [];
  activeLink = "";

  context: CanvasRenderingContext2D;
  prikaziRaspored: boolean = false;

  onTabChanged(event: MatTabChangeEvent){
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

    // this.context.fillStyle = 'red';
    // this.context.fillText("Zauzet", 165, 140); // za id1
    // this.context.fillText("Zauzet", 620, 140); // za id2
    // this.context.fillText("Zauzet", 170, 385); // za id3
    // this.context.fillText("Zauzet", 620, 385); // za id4
  }

  addLink(){
   if(this.rasporedStolova==null){
    this.tableService.addLocation(this.preduzece.id, this.preduzece.kase[0].lokacija).subscribe(res=>{
      if(res['message']=='ok'){
        this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
          this.ruter.navigate(['/enterpriseTables']);
        });
      }
    })
   } else {
    for(let index=0; index<this.preduzece.kase.length; index++){
      if(this.rasporedStolova.objekti.find(objekat=> objekat.lokacija==this.preduzece.kase[index].lokacija)==undefined){
        this.tableService.addLocation(this.preduzece.id, this.preduzece.kase[index].lokacija).subscribe(res=>{
          if(res['message']=='ok'){
            this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
              this.ruter.navigate(['/enterpriseTables']);
            });
          }
        })
        break;
      }
    }
   }
  }

  logout(){
    sessionStorage.removeItem('currentUser');
    this.ruter.navigate(['/login']);
  }
}
