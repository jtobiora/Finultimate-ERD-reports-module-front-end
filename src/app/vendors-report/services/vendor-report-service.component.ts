import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { Observable } from "rxjs";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {REST_BASE_URL} from "../../shared/util/constant";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';



@Injectable()
export class VendorReportServiceComponent{
      //private _url = "http://localhost:8088/vendors-report/by-brand";
      constructor(private http : Http){}


 //ORIGINAL  
/* getVendorsProductsByBrand(url : string) : Observable<any>{
    return this.http.get(REST_BASE_URL + url)
    .map((response : Response) => response.json())
    .do(data => console.log(data))
    .catch(this.handleError); 
}
*/



getVendorsProductsByBrand(url : string, startDate : string, endDate : string) {
    let data = { startDate : startDate, endDate : endDate};
    //console.log('Data: ' + JSON.stringify(data));
    return this.fetchResult(url, JSON.stringify(data));

}

getVendorsReportByVendorPayments(url : string, startDate : string, endDate : string){
   let data = { startDate : startDate, endDate : endDate};
   return this.fetchResult(url, JSON.stringify(data));
}

getVendorsReportByVendorPerformance(url : string, startDate : string, endDate : string){
    let data = { startDate : startDate, endDate : endDate};
    return this.fetchResult(url, JSON.stringify(data));
}

    public fetchResult(apiUrl: string, jsonString: string) : Observable<any>{ 
    let headers      = new Headers({ 'Content-Type':'application/json', 'Accept':'application/json'});
    let options       = new RequestOptions({ headers: headers });
    return this.http.post(REST_BASE_URL+apiUrl, jsonString, options)
    .map((res) => res.json())
    .catch(this.handleError);
    
  }


  extractData(res: Response){
  let body = res.json();
  return body;
  }

  handleError(error : Response | any){
    console.error(error.message || error);
  return Observable.throw(error.status);
  }
}