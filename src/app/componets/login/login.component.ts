import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  sing : boolean = false;

  constructor(public loginService : LoginService) { }
  
  ngOnInit() {
  }
  logperson(form: NgForm){
    this.loginService.actionlogin(form.value);
  }
  singup(){
    if(this.sing){
      this.sing = false;
    }else{
      this.sing = true;
    }
  }
}
