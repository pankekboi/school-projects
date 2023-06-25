import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DailyReport } from '../models/dailyReport';
import { RegisterRequest } from '../models/registerRequest';
import { User } from '../models/user';
import { ReceiptService } from '../services/receipt.service';
import { RequestService } from '../services/request.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private ruter: Router, private userService: UserService, private requestService: RequestService, private receiptService: ReceiptService) { }

  ngOnInit(): void {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if(currentUser==null){
      this.ruter.navigate(['/login']);
      return;
    } else if(currentUser.tip!=0){
      switch(currentUser.tip){
        case 1:
          this.ruter.navigate(['/customer']);
          return;;
        case 2:
          this.ruter.navigate(['/enterprise']);
          return;
      }
    } else {
      this.userService.getAllRequests().subscribe((zahtevi: RegisterRequest[])=>{
        if(zahtevi){
          this.zahtevi = zahtevi;
        }
      })
    }
  }

  page = 1;
  pageSize = 10;

  zahtevi: RegisterRequest[];
  izvestaji: DailyReport[] = [];
  dodavanjeKupca: boolean = true;
  dodavanjePreduzeca: boolean = false;

  datumPocetka: Date = null;
  datumKraja: Date = null;
  nazivPredParam: string = "";
  pibPredParam: string = "";

  errMsgKupac: string = "";
  errMsgPred: string = "";
  errMsgPretraga: string = "";

  imeKupac: string = "";
  prezimeKupac: string = "";
  usernameKupac: string = "";
  passwordKupac: string = "";
  telefonKupac: string = "";
  brojLK: string = "";

  imePred: string = "";
  prezimePred: string = "";
  usernamePred: string = "";
  passwordPred: string = "";
  telefonPred: string = "";
  emailPred: string = "";
  nazivPred: string = "";
  adresaPred: string = "";
  pibPred: string = "";
  maticniBrojPred: string = "";
  logoPred: string = "";
  izabraniFajl: File = null;

  onFileChanged(event){
    this.izabraniFajl = event.target.files[0];

    this.checkFileType();
    this.checkImageSize();
  }

  checkFileType(){
    this.errMsgPred = "";
    const[type, subtype]=this.izabraniFajl.type.split('/');

    if(!(subtype=='png' || subtype=='jpg')){
      this.errMsgPred = "Fajl mora da bude u png ili jpg formatu!";
      return;
    }
  }

  checkImageSize(){
    this.errMsgPred = "";
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();
      this.logoPred = e.target.result;
      img.onload = rs => {
        const img_height = rs.currentTarget['height'];
        const img_width = rs.currentTarget['width'];

        if(img_height < 100 || img_height > 300 || img_width < 100 || img_width > 300){
          this.errMsgPred = "Velicina slike mora da bude veca od 100x100px a manja od 300x300px!"
          return;
        }
      };
    };

    reader.readAsDataURL(this.izabraniFajl);
  }

  prikaziDodavanjeKupca(){
    this.dodavanjeKupca = true;
    this.dodavanjePreduzeca = false;
  }

  prikaziDodavanjePreduzeca(){
    this.dodavanjeKupca = false;
    this.dodavanjePreduzeca = true;
  }

  pretraziIznose(){
    this.errMsgPretraga = "";
    this.izvestaji = [];

    if(this.datumPocetka == null || this.datumKraja == null){
      this.errMsgPretraga = "Datumi pocetka i kraja se moraju izabrati!";
      return;
    }

    if(this.datumKraja < this.datumPocetka){
      this.errMsgPretraga = "Datum kraja ne moze da bude pre datuma pocetka!";
      return;
    }

    this.datumPocetka.setHours(0, 0, 0, 0);
    this.datumKraja.setHours(23, 59, 59, 999);

    this.receiptService.getAllReceiptsDate(this.nazivPredParam, this.pibPredParam, this.datumPocetka, this.datumKraja).subscribe((izvestaji: DailyReport[])=>{
      if(izvestaji){
        if(izvestaji.length==0){
          this.errMsgPretraga = "Ne postoji izvestaj pazara za unesene parametre.";
          return;
        }

        for(let index = 0; index < izvestaji.length; index++){
          izvestaji[index].datum = new Date(izvestaji[index].datum);
        }

        this.izvestaji = izvestaji;
      }
    })
  }

  odobriZahtev(id){
    this.requestService.odobriZahtev(id).subscribe(res=>{
      if(res['message']=='ok'){
        this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
          this.ruter.navigate(['/admin']);
        });
      }
    })
  }

  izbrisiZahtev(id){
    this.requestService.izbrisiZahtev(id).subscribe(res=>{
      if(res['message']=='ok'){
        this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
          this.ruter.navigate(['/admin']);
        });
      }
    })
  }

  dodajKupca(){
    this.errMsgKupac = "";

    if(this.imeKupac =='' || this.prezimeKupac =='' || this.usernameKupac == '' || this.passwordKupac == '' || this.telefonKupac == '' || this.brojLK == ''){
      this.errMsgKupac = "Sva polja za dodavanje kupca su obavezna i moraju biti popunjena!";
      return;
    }

    this.userService.checkUsername(this.usernameKupac).subscribe((user: User)=>{
      if(user){
        this.errMsgKupac = "Korisnik sa takvim korisnickim imenom vec postoji u bazi podataka!";
        return;
      }
      else {
        const passwordRegex = /^(?=[A-Z]|[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.]).{8,12}$/

        let result = passwordRegex.test(this.passwordKupac);
        if(!result){
          this.errMsgKupac = "Lozinka mora da pocinje slovom, sadrzi jedno veliko slovo, jedan broj, jedan specijalni karakter i mora da bude minimalne velicine 8 karaktera, a maksimalne 12 karaktera!"
          return;
        }

        const landlineRegex = /^(0[1-3][0-9]{1}[0-9]{7})$/
        const mobileRegex = /^(06[0-9]{1}[0-9]{7})$/

        let resultLandline = landlineRegex.test(this.telefonKupac);
        let resultMobile = mobileRegex.test(this.telefonKupac);
        if(!resultLandline && !resultMobile){
          this.errMsgKupac = "Kontakt telefon nije u dobrom formatu! Za fiksne telefone: prve tri cifre su pozivni broj grada u Srbiji, nakon toga sledi 7 cifara. " +
          +"Za mobilne telefone: prve tri cifre su operateri, nakon toga sledi 7 cifara.";
          return;
        }

        let regexLK = /^[0-9]{13}$/
        let resultLK = regexLK.test(this.brojLK);
        if(!resultLK){
          this.errMsgKupac = "Licna karta nije u dobrom formatu!"
        }

        this.userService.addCustomer(this.imeKupac, this.prezimeKupac, this.usernameKupac, this.passwordKupac, this.telefonKupac, this.brojLK).subscribe(res=>{
          if(res['message']=='ok'){
            alert("Kupac je uspesno dodat u bazu!");
            this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
              this.ruter.navigate(['/admin']);
            });
          }
        })
      }
    })
  }

  dodajPreduzece(){
    this.errMsgPred = "";
    
    if(this.imePred==""){
      this.errMsgPred = "Polje za ime odgovornog lica je obavezno!"
      return;
    }

    if(this.prezimePred==""){
      this.errMsgPred = "Polje za prezime odgovornog lica je obavezno!"
      return;
    }
    
    this.userService.checkUsername(this.usernamePred).subscribe((user: User)=>{
      if(user){
        this.errMsgPred = "Korisnik sa takvim korisnickim imenom vec postoji u bazi podataka!";
        return;
      }
      else {
        if(this.passwordPred==""){
          this.errMsgPred = "Polje za lozinku je obavezno!"
          return;
        }

        const passwordRegex = /^(?=[A-Z]|[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.]).{8,12}$/

        let result = passwordRegex.test(this.passwordPred);
        if(!result){
          this.passwordPred = "";
          this.errMsgPred = "Lozinka mora da pocinje slovom, sadrzi jedno veliko slovo, jedan broj, jedan specijalni karakter i mora da bude minimalne velicine 8 karaktera, a maksimalne 12 karaktera!"
          return;
        }

        if(this.telefonPred==""){
          this.errMsgPred = "Polje za kontakt telefon je obavezno!";
          return;
        }

        const landlineRegex = /^(0[1-3][0-9]{1}[0-9]{7})$/
        const mobileRegex = /^(06[0-9]{1}[0-9]{7})$/

        let resultLandline = landlineRegex.test(this.telefonPred);
        let resultMobile = mobileRegex.test(this.telefonPred);
        if(!resultLandline && !resultMobile){
          this.errMsgPred = "Kontakt telefon nije u dobrom formatu! Za fiksne telefone: prve tri cifre su pozivni broj grada u Srbiji, nakon toga sledi 7 cifara. " +
          +"Za mobilne telefone: prve tri cifre su operateri, nakon toga sledi 7 cifara.";
          return;
        }
        
        if(this.emailPred==""){
          this.errMsgPred = "Polje za e-mail adresu je obavezno!";
          return;
        }

        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        let resultEmail = emailRegex.test(this.emailPred);
        if(!resultEmail){
          this.errMsgPred = "Nevalidna e-mail adresa!";
          return;
        }

        // provera da li korisnik sa datim emailom postoji u bazi
        this.userService.checkEmail(this.emailPred).subscribe(res=>{
          let request = res['request'];
          let enterprise = res['enterprise'];
          
          if(request || enterprise){
            this.errMsgPred = "Korisnik sa datom e-mail adresom vec postoji u sistemu!";
            return;
          } else {
            if(this.nazivPred==""){
              this.errMsgPred = "Polje za naziv preduzeca je obavezno!";
              return;
            }
    
            if(this.adresaPred==""){
              this.errMsgPred = "Polje za adresu sedista preduzeca je obavezno!";
              return;
            }
    
            const addrRegex = /^[A-Za-z]+(\,)? [A-Za-z]+(\,)? ([A-Z]{1})?([1-9][0-9]{4})+(\,)? ([a-zA-Z\s]{1,}) (\d{1,})$/
            
            let resultAddr = addrRegex.test(this.adresaPred);
            if(!resultAddr){
              this.errMsgPred = "Adresa preduzeca nije u dobrom formatu! Dozvoljeni unos izgleda ovako: drzava, grad, postanski broj, ulica i broj. Gde su zarezi opcioni."
              return;
            }
    
            if(this.pibPred==""){
              this.errMsgPred = "Polje za PIB je obavezno!";
              return;
            }
    
            const pibRegex = /^[1-9]([0-9]{8})$/
    
            let pibResult = pibRegex.test(this.pibPred);
            if(!pibResult){
              this.errMsgPred = "PIB nije u dobrom formatu!";
              return;
            }
    
            if(this.maticniBrojPred==""){
              this.errMsgPred = "Polje za maticni broj preduzeca je obavezno!";
              return;
            }
    
            const numberRegex = /^[0-9]{8}$/
    
            let numberResult = numberRegex.test(this.maticniBrojPred);
            if(!numberResult){
              this.errMsgPred = "Maticni broj preduzeca se sastoji samo od 8 cifara!";
              return;
            }
    
            if(this.logoPred==null){
              this.errMsgPred = "Logo preduzeca je obavezan!";
              return;
            }
    
            this.checkFileType();
            if(this.errMsgPred!="")return;
    
            this.checkImageSize();
            if(this.errMsgPred!="")return;
          }

          // provere dodatnih informacija dodati ovde, ako bude trebalo
          let data = {
            ime: this.imePred,
            prezime: this.prezimePred,
            username: this.usernamePred,
            password: this.passwordPred,
            telefon: this.telefonPred,
            email: this.emailPred,
            nazivPreduzeca: this.nazivPred,
            adresaPreduzeca: this.adresaPred,
            pib: this.pibPred,
            maticniBroj: this.maticniBrojPred,
            logo: this.logoPred
          }

          this.userService.addEnterprise(data).subscribe(res=>{
            if(res['message']=='ok'){
              alert("Preduzece je uspesno dodato u bazu!");
              this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
                this.ruter.navigate(['/admin']);
              });
            }
          })
        })
      }
    })
  }

  logout(){
    sessionStorage.removeItem('currentUser');
    this.ruter.navigate(['/adminLogin']);
  }

}
