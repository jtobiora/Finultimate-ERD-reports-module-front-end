import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {REST_BASE_URL} from "../../shared/util/constant";


@Injectable()
export class InventoryService {
  //private rest_url = 'http://localhost:9001/';
  constructor(private http: Http) {}

  generateReport(url: string, startDate: Date, endDate: Date,apiEnumMeasureValue: string, apiEnumReportTypeValue: number) {
    let user = localStorage.getItem('user_info');
    let data = { startDate : startDate, endDate : endDate,
       measureType: apiEnumMeasureValue,reportType:apiEnumReportTypeValue,user:user};
    return this.fetchResult(url, JSON.stringify(data));
  }

  fetchResult(apiUrl: string, jsonString: string) {
    let headers      = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json'});
    let options       = new RequestOptions({ headers: headers });
    return this.http.post(REST_BASE_URL + apiUrl, jsonString, options)
      .map((res) => res.json());
  }

}
