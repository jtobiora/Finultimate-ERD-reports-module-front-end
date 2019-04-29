import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { Observable } from "rxjs";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {REST_BASE_URL} from "../../shared/util/constant";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable()
export class VendorsService{
//private rest_url = 'http://localhost:9000/';
constructor(private http: Http) {}

// for ReportType = VENDOR SUMMARY
generateBrandReport(url : string, startDate : string, endDate : string){
    let user = localStorage.getItem('user_info');
    let data = { startDate : startDate, endDate : endDate,user:user};
    return this.fetchResult(url, JSON.stringify(data));
}


generatePaymentReport(url : string, startDate : string, endDate : string){
   let user = localStorage.getItem('user_info');
   let data = { startDate : startDate, endDate : endDate,user:user};
    return this.fetchResult(url, JSON.stringify(data));
}

generatePerformanceReport(url : string, startDate : string, endDate : string){
    let user = localStorage.getItem('user_info');
    let data = { startDate : startDate, endDate : endDate,user:user};
    return this.fetchResult(url, JSON.stringify(data));
}

      // for ReportType = PROCUREMENT
generateProcurementReport(url : string, startDate : string, endDate : string){
    let user = localStorage.getItem('user_info');
    let data = { startDate : startDate, endDate : endDate,user:user};
    return this.fetchResult(url, JSON.stringify(data));
}


fetchResult(apiUrl: string, jsonString: string){
    let headers      = new Headers({ 'Content-Type':'application/json', 'Accept':'application/json'});
    let options       = new RequestOptions({ headers: headers });
       return this.http.post(REST_BASE_URL+apiUrl, jsonString, options)
            .map((res) => res.json());
}
}