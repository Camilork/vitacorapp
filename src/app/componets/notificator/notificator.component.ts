import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificator',
  templateUrl: './notificator.component.html',
  styleUrls: ['./notificator.component.sass']
})
export class NotificatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  notifi(text){
    var x = document.getElementById("snackbar");
    x.innerHTML = text
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
}
