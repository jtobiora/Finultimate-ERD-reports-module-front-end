import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { LOGIN_REDIRECT } from '../shared/util/constant';


/////////////////////////
////////////////////////
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { REST_BASE_URL } from '../shared/util/constant';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
//////////////////////////
//////////////////////////

declare var $: any, pickadate: any, moment: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  username: string;
  password: string;
  track: string;
  checks: boolean = true;
  pageError: any;

  constructor(private router: Router, private _route: ActivatedRoute, private http: Http) {

  }


  ngOnInit() {
    this._route.queryParams.subscribe((params: Params) => {
      this.username = params['username'];
      this.password = params['password'];
    });


    // console.log('USING ONLY PARAMS');
    // this._route.params.subscribe((params: Params) => {
    //   this.username = params['username'];
    //   this.password = params['password'];
    // });

    console.log('Username obtained from URL');
    console.log(this.username);
    console.log('Password Obtained from URL')
    console.log(this.password);

    let data = { username: this.username, password: this.password };
    let redirectUrl = window.location.hostname;

    
    // let result = this.fetchResult('sales-report-service/login', JSON.stringify(data))
    //   .subscribe((result) => {
    //     if (result) {
    //       localStorage.setItem('user_info', JSON.stringify(result));
    //       window.location.href = redirectUrl + '/Reporting/sales-report/summary';
    //       //window.location.href = LOGIN_REDIRECT;
    //     }
    //   });

    this.fetchResult('sales-report-service/login', JSON.stringify(data))
    .subscribe(
      res => {    
        localStorage.setItem('user_info', JSON.stringify(res));
        window.location.href = redirectUrl + '/Reporting/sales-report/summary';
        //window.location.href = LOGIN_REDIRECT;
      },
      err =>{
            alert('An error occured while processing this application!');
      } 
    );
  }



  fetchResult(apiUrl: string, jsonString: string) {
    let headers      = new Headers({ 'Content-Type': 'application/json', 'Accept':'application/json'});
    let options       = new RequestOptions({ headers: headers });

       return this.http.post(REST_BASE_URL + apiUrl, jsonString, options)
            .do((res) => console.log(res))
            .map((res) => res.json())
            .catch((error: any) => Observable.throw(error.json).error);   
  }
}
