import { Component,Input, OnInit } from '@angular/core';
import {LOGOUT_LINK} from "../shared/util/constant";



declare var $:any, pickadate:any, moment:any;

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})


export class LogoutComponent implements OnInit {

  constructor() { 
 
  }

  ngOnInit() {
     this.logout();
  }


  logout(){
        let logoutUrl = window.location.hostname;
        localStorage.removeItem('user_info');
        window.location.href = logoutUrl + '/FinultimatePrime';    
  }

 

}
