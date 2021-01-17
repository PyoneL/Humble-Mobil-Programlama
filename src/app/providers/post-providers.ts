import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders,HttpErrorResponse } from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AccessProviders{
    server:string="https://cemre.enginyenice.shop/humble_api/method/";
    constructor(
        public http : HttpClient,
    ){ }
    postJsonData(body,file){
        let headers = new HttpHeaders({
            'Content-Type':'application/json; charset=UTF-8'
        });
        let options = {
            headers : headers
        }
        return this.http.post(this.server + file, JSON.stringify(body),options)
        .map(res => res);
    }

    postFormData(body,file){
        let headers = new HttpHeaders({
            'Content-Type':'multipart/form-data;'
        });
        let options = {
            headers : headers
        }
        return this.http.post(this.server + file, body, options)
        .timeout(10000)
        .map(res => res);
    }
    
}