import { Component, OnInit ,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { UsercreatorComponent } from '../usercreator/usercreator.component'
import { NotificatorComponent } from '../notificator/notificator.component'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.sass'],
  providers: [PersonService],
})

export class PersonComponent implements OnInit {

  constructor(public personService : PersonService){}
  notificacion = [];
  
  @ViewChild(UsercreatorComponent) userCreatorComponent: UsercreatorComponent;
  @ViewChild(NotificatorComponent) notificatorComponent: NotificatorComponent;
  
  ngOnInit() {this.getperson()}
  
  editperson(person: Person) {
    this.userCreatorComponent.editperson(person);
  }

  getperson(){
    this.personService.getPerson()
    .subscribe(res => {
      this.personService.person = res as Person[];
    })
  }

  deleteperson(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete it?')) {
      this.personService.deletePerson(_id)
        .subscribe(res => {
          this.notificatorComponent.notifi("Successful delete")   
          this.getperson();
          this.userCreatorComponent.resetForm();
        });
    }
  }
}
