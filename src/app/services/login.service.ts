import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import {Router} from '@angular/router';
@Injectable()
export class LoginService {
  message = '';
  data: any;
  logina : Person;
  server: Config;
  constructor(public http : HttpClient,public router: Router) { 
    this.logina = new Person();
    this.server = new Config;
  }

  actionlogin(req) {
    this.http.post(this.server.server+'/login',req).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('staffondemandToken', this.data.token);
      this.router.navigateByUrl('/user');
    }, err => {
      this.message = err.error.msg;
      console.log(err.error.msg);
      if(err.error.msg == undefined){
        alert("Connexion refused");
      }else{
        alert(err.error.msg);
      }
    });
  }
}


