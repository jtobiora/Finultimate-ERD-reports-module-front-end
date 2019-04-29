import {Injectable} from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {REST_BASE_URL} from "../util/constant";

@Injectable()
export class CrudService {

  constructor(private http: Http) {}

  public post(apiUrl: string, jsonString: string){
    //let token: string = JSON.parse(sessionStorage.getItem('token'));
    //let headers      = new Headers({ 'Content-Type':'application/json', 'Accept':'application/json', 'Authorization':'Bearer '+token});
    let headers      = new Headers({ 'Content-Type':'application/json', 'Accept':'application/json'});
    let options       = new RequestOptions({ headers: headers });
    return this.http.post(REST_BASE_URL+apiUrl, jsonString, options).map((res) => res.json());
  }

  public postGeneric(apiUrl: string, jsonString: string){
    //let token: string = JSON.parse(sessionStorage.getItem('token'));
    //let headers      = new Headers({ 'Content-Type':'application/json', 'Accept':'application/json', 'Authorization':'Bearer '+token});
    let headers      = new Headers({ 'Content-Type':'application/json', 'Accept':'application/json'});
    let options       = new RequestOptions({ headers: headers });
    return this.http.post(apiUrl, jsonString, options).map((res) => res.json());
  }


  public get(apiUrl: string){
    //let token: string = JSON.parse(sessionStorage.getItem('token'));
    //let headers      = new Headers({ 'Content-Type':'application/json', 'Accept':'application/json', 'Authorization':'Bearer '+token});
    let headers      = new Headers({ 'Content-Type':'application/json', 'Accept':'application/json'});
    let options       = new RequestOptions({ headers: headers });
    return this.http.get(REST_BASE_URL+apiUrl, options).map((res) => res.json());
  }


  public getGeneric(apiUrl: string){
    //let token: string = JSON.parse(sessionStorage.getItem('token'));
    //let headers      = new Headers({ 'Content-Type':'application/json', 'Accept':'application/json', 'Authorization':'Bearer '+token});
    let headers      = new Headers({ 'Content-Type':'application/json', 'Accept':'application/json'});
    let options       = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl, options).map((res) => res.json());
  }


  public loadAirports(){
    let headers      = new Headers({ 'Content-Type':'application/json', 'Accept':'application/json'});
    let options       = new RequestOptions({ headers: headers });
    return this.http.get('assets/data/airport.json', options).map((res) => res.json());
  }


  public getRand(apiUrl: string){
    let time = new Date().getTime();
    return this.http.get(REST_BASE_URL+apiUrl+`?rand=${time}`).map((res) => res.json());
  }


}
