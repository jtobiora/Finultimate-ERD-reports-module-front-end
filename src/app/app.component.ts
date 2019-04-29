import { Component,OnInit,AfterViewInit} from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute,Params} from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit{
   track : boolean = true;
   username : string;
   loginname : string;
  constructor(private router: Router,private _route: ActivatedRoute){

  }
  
  ngOnInit(){    

  }


  ngAfterViewInit() {
   
  }



    delay(){
            $.blockUI({
               message: '<h4>Please wait...</h4>',
               centerY: false,
               centerX: false,
               css:{
                  position: 'fixed',
                  margin: 'auto 0',
                  padding: '3px',
                  font: '15px',
                  border: '1px solid #a00',backgroundColor: '#ddd'
           }
             });
               setTimeout($.unblockUI, 400); 
    }

}
