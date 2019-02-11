import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import { Config } from '../config/config';
import { NgForm } from '@angular/forms';

@Injectable()
export class PersonService {
  selectperson : Person;
  person : Person[];
  server: Config;
  constructor(public http: HttpClient) { 
    this.selectperson = new Person();
    this.server = new Config;
  }
  
  getPerson(){
    return this.http.get(this.server.server);
  }
  postPerson(person: Person){
    return this.http.post(this.server.server,person);
  }
  putPerson(person: Person){
    return this.http.put(this.server.server + `/${person._id}`,person); 
  }
  deletePerson(_id: string){
    return this.http.delete(this.server.server + `/${_id}`); 
  }

  datatcheck(form?: NgForm){
    if(!this.datatest(
      form.value.username,
      form.value.first_name,
      form.value.first_lastname,
      form.value.email,
      form.value.country,
      form.value.celphone,
      form.value.Rate_by_hour,
      form.value.Rate_by_mount
    )){ 
      return true
    }else{
      return false
    }
  }
  datatest(
    username : string,
    first_name : string,
    first_lastname : string,
    email : string,
    country : string,
    celphone : string,
    Rate_by_hour : string,
    Rate_by_mount : string,
  ):boolean{
    if (
      (username == "") || (username == null) || 
      (first_name == "") || (first_name == null) || 
      (first_lastname == "") || (first_lastname == null) || 
      (email == "") || (email == null) || 
      (country == "") || (country == null) || 
      (celphone == "") || (celphone == null) || 
      (Rate_by_hour == "") || (Rate_by_hour == null) || 
      (Rate_by_mount == "") || (Rate_by_mount == null)
    ){ 
      alert("Los campos no pueden quedar vacios");
      return false;
    }
    return true;
  }


}
