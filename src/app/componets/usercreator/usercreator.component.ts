import { Component ,OnInit, Output ,EventEmitter, Input,ViewChild} from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { NotificatorComponent } from '../notificator/notificator.component'

@Component({
  selector: 'app-usercreator',
  templateUrl: './usercreator.component.html',
  styleUrls: ['./usercreator.component.sass'],
  providers: [PersonService],
})

export class UsercreatorComponent implements OnInit {
  @ViewChild(NotificatorComponent) notificatorComponent: NotificatorComponent;
  @Output() getUser = new EventEmitter;
  @Input() singup : boolean = false; 

  passwordInputVisible : boolean = true;
  title : string = 'Edit User';

  constructor(public personService : PersonService,public router: Router) { }

  ngOnInit() {
    if(this.singup){ this.title='Create User' }
  }
  editperson(person: Person) {
    this.personService.selectperson = person;
    this.personService.selectperson.password = null;
    document.documentElement.scrollTop = 0
    this.passwordInputVisible = false;
  }
  addperson(form?: NgForm) {   
    if(this.personService.datatcheck(form)){
      this.notificatorComponent.notifi("Complete the required fields")
      return 0}
    if(form.value._id) {
      this.personService.putPerson(form.value)
        .subscribe(res => {
          console.log(res)
          if(res == null){
            this.notificatorComponent.notifi("Incorret data")
            return 0
          }
          this.notificatorComponent.notifi("Update finished")
          this.resetForm(form);
        });
    } else {
      this.personService.postPerson(form.value)
      .subscribe(res => {
        if(res['success']){
          this.notificatorComponent.notifi(res['msg'])
          this.resetForm(form);
          this.getUser.emit();
        }else{
          this.notificatorComponent.notifi('Error ' + res['msg'])
        }
      });
    }
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.passwordInputVisible = true;
      this.personService.selectperson = new Person();
      if(!this.singup){
        this.getUser.emit();
      }
    }
  }
  returnpage(){
    this.singup = false;
    this.getUser.emit();
  }
}
