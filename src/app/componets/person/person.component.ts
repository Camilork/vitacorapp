import { Component, OnInit ,Output,EventEmitter, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { UsercreatorComponent} from '../usercreator/usercreator.component'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.sass'],
  providers: [PersonService],
})

export class PersonComponent implements OnInit {

  constructor(public personService : PersonService){}
  notificacion = [];
  
  @ViewChild(UsercreatorComponent)
  private userCreatorComponent: UsercreatorComponent;

  ngOnInit() {this.getperson(); }
  
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
          this.notificar("Eliminacion","Se elimino con exito ");    
          this.getperson();
          this.userCreatorComponent.resetForm();
        });
    }
  }
  
  notificar(titulo:string,mensaje:string){
    let date=new Date;
    let hora=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(); 
    this.notificacion.unshift({titulo : titulo,mensaje : mensaje,hora:hora});
  }
}
