import { Component } from '@angular/core';
import { SessionService } from './services/session.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [SessionService]
})
export class AppComponent {
  constructor(private sessionService : SessionService,private router : Router){

  }
  title = 'app';
  loger : boolean = false;

ngOnInit() {
  this.sessioncheck();  
  this.router.events.forEach((event) => { 
    if (event['url'] == '/'){
      this.loger = false;
    }else{
      this.loger =true;
    }
    }); 
}
myFunction(){
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

menurouter(dir){
  this.router.navigateByUrl('/'+dir);
}
sessioncheck(){
  if (localStorage.getItem('staffondemandToken') === null){
    this.router.navigateByUrl('');
    this.loger = false;
  }else{
    this.router.navigateByUrl('/user');
    this.loger = true;
  }
} 
sessionclose(){
  localStorage.removeItem('staffondemandToken')
  this.router.navigateByUrl('');
  this.loger=false;
}

}