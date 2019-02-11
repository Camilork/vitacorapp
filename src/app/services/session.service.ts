import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Config } from '../config/config';


@Injectable()
export class SessionService {
  constructor(public http : HttpClient) { 
  }
  
  sessioncheck(){
    const headerDict = {
      'Content-Type': 'application/json',
      "Authorization" : localStorage.getItem('staffondemandToken')
    }
    const head = {headers: new HttpHeaders(headerDict)}
    let server = new Config;
    console.log(this.http.get(server.server+'/session/check',head)) 
  }


}
