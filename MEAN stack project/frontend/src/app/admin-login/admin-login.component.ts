import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string = "";
  password: string = "";
  errMsg: string = "";

  login(){
    this.errMsg = "";

    if(this.username == "" || this.password == ""){
      this.errMsg = "Polja za korisnicko ime i lozinku su obavezna!";
      return;
    }

    this.userService.login(this.username, this.password).subscribe((user: User)=>{
      if(user){
        if(user.tip != 0){
          this.errMsg = "Greska! Samo administrator sme da se prijavi preko ove forme!";
          return;
        } else {
          sessionStorage.setItem("currentUser", JSON.stringify(user));
          this.router.navigate(['/admin']);
        }
      }
    })
  }
}
