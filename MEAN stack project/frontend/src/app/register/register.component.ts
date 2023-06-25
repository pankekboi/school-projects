import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userServis: UserService, private ruter: Router) { }

  ngOnInit(): void {
  }

  logo: File = null;
  logoImg: string = ""; // base64 kodovana slika, moze samo ovo da se cuva umesto ceo fajl
  errMsg: string = "";

  name: string = "";
  lastname: string = "";
  username: string = "";
  password: string = "";
  password2: string = "";
  phone: string = "";
  email: string = "";
  enterpriseName: string = "";
  hqAddr: string = "";
  pib: string = "";
  hqNumber: string = "";

  onFileChanged(event){
    this.logo = event.target.files[0];

    this.checkFileType();
    this.checkImageSize();
  }

  checkFileType(){
    this.errMsg = "";
    const[type, subtype]=this.logo.type.split('/');

    if(!(subtype=='png' || subtype=='jpg')){
      this.errMsg = "Fajl mora da bude u png ili jpg formatu!";
      return;
    }
  }

  checkImageSize(){
    this.errMsg = "";
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();
      this.logoImg = e.target.result;
      img.onload = rs => {
        const img_height = rs.currentTarget['height'];
        const img_width = rs.currentTarget['width'];

        if(img_height < 100 || img_height > 300 || img_width < 100 || img_width > 300){
          this.errMsg = "Velicina slike mora da bude veca od 100x100px a manja od 300x300px!"
          return;
        }
      };
    };

    reader.readAsDataURL(this.logo);
  }

  register(){
    this.errMsg = "";
    
    if(this.name==""){
      this.errMsg = "Polje za ime odgovornog lica je obavezno!"
      return;
    }

    if(this.lastname==""){
      this.errMsg = "Polje za prezime odgovornog lica je obavezno!"
      return;
    }
    
    this.userServis.checkUsername(this.username).subscribe((user: User)=>{
      if(user){
        this.errMsg = "Korisnik sa takvim korisnickim imenom vec postoji u bazi podataka!";
        return;
      }
      else {
        if(this.password=="" || this.password2==""){
          this.errMsg = "Polje za lozinku je obavezno!"
          return;
        }

        const passwordRegex = /^(?=[A-Z]|[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.]).{8,12}$/

        let result = passwordRegex.test(this.password);
        if(!result){
          this.errMsg = "Lozinka mora da pocinje slovom, sadrzi jedno veliko slovo, jedan broj, jedan specijalni karakter i mora da bude minimalne velicine 8 karaktera, a maksimalne 12 karaktera!"
          return;
        }

        if(!(this.password==this.password2)){
          this.errMsg = "Lozinke se ne podudaraju! Unesite ih ponovo.";
          this.password = "";
          this.password2 = "";
          return;
        }

        if(this.phone==""){
          this.errMsg = "Polje za kontakt telefon je obavezno!";
          return;
        }

        const landlineRegex = /^(0[1-3][0-9]{1}[0-9]{7})$/
        const mobileRegex = /^(06[0-9]{1}[0-9]{7})$/

        let resultLandline = landlineRegex.test(this.phone);
        let resultMobile = mobileRegex.test(this.phone);
        if(!resultLandline && !resultMobile){
          this.errMsg = "Kontakt telefon nije u dobrom formatu! Za fiksne telefone: prve tri cifre su pozivni broj grada u Srbiji, nakon toga sledi 7 cifara. " +
          +"Za mobilne telefone: prve tri cifre su operateri, nakon toga sledi 7 cifara.";
          return;
        }
        
        if(this.email==""){
          this.errMsg = "Polje za e-mail adresu je obavezno!";
          return;
        }

        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        let resultEmail = emailRegex.test(this.email);
        if(!resultEmail){
          this.errMsg = "Nevalidna e-mail adresa!";
          return;
        }

        // provera da li korisnik sa datim emailom postoji u bazi
        this.userServis.checkEmail(this.email).subscribe(res=>{
          let request = res['request'];
          let enterprise = res['enterprise'];
          
          if(request || enterprise){
            this.errMsg = "Korisnik sa datom e-mail adresom vec postoji u sistemu!";
            return;
          } else {
            if(this.enterpriseName==""){
              this.errMsg = "Polje za naziv preduzeca je obavezno!";
              return;
            }
    
            if(this.hqAddr==""){
              this.errMsg = "Polje za adresu sedista preduzeca je obavezno!";
              return;
            }
    
            const addrRegex = /^[A-Za-z]+(\,)? [A-Za-z]+(\,)? ([A-Z]{1})?([1-9][0-9]{4})+(\,)? ([a-zA-Z\s]{1,}) (\d{1,})$/
            
            let resultAddr = addrRegex.test(this.hqAddr);
            if(!resultAddr){
              this.errMsg = "Adresa preduzeca nije u dobrom formatu! Dozvoljeni unos izgleda ovako: drzava, grad, postanski broj, ulica i broj. Gde su zarezi opcioni."
              return;
            }
    
            if(this.pib==""){
              this.errMsg = "Polje za PIB je obavezno!";
              return;
            }
    
            const pibRegex = /^[1-9]([0-9]{8})$/
    
            let pibResult = pibRegex.test(this.pib);
            if(!pibResult){
              this.errMsg = "PIB nije u dobrom formatu!";
              return;
            }
    
            if(this.hqNumber==""){
              this.errMsg = "Polje za maticni broj preduzeca je obavezno!";
              return;
            }
    
            const numberRegex = /^[0-9]{8}$/
    
            let numberResult = numberRegex.test(this.hqNumber);
            if(!numberResult){
              this.errMsg = "Maticni broj preduzeca se sastoji samo od 8 cifara!";
              return;
            }
    
            if(this.logo==null){
              this.errMsg = "Logo preduzeca je obavezan!";
              return;
            }
    
            this.checkFileType();
            if(this.errMsg!="")return;
    
            this.checkImageSize();
            if(this.errMsg!="")return;
    
            this.userServis.register(this.name, this.lastname, this.username, this.password, this.phone, this.email, this.enterpriseName, this.hqAddr, this.pib, this.hqNumber, this.logoImg).subscribe(res=>{
              
              alert(res['message'])
    
              this.ruter.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
                this.ruter.navigate(['/register']);
              });
            });
          }
        })
      }
    })
  }
}
