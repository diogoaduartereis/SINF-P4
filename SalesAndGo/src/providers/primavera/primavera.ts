import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PrimaveraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrimaveraProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PrimaveraProvider Provider');
  }

  genAccessToken(){
    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", 'http://94.60.211.16:2018/WebApi/token', false);
    var params = 'username=FEUP&password=qualquer1&company=BELAFLOR&instance=DEFAULT&grant_type=password&line=professional';
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    
    let access_token = "";

    xhttp.onreadystatechange=function(){
      if(this.readyState==4 && this.status==200){
        access_token = JSON.parse(xhttp.responseText).access_token;
      }
    }

    xhttp.send(params)

    return access_token;
  }

  postRequest(access_token, url, expectedResponse = 200, data){
    const Http = new XMLHttpRequest();
    Http.open("POST", url, false);
    Http.setRequestHeader("Content-type", "application/json; charset=utf-8");
    Http.setRequestHeader("Authorization", 'Bearer ' + access_token);

    let response = {};

    Http.onreadystatechange=function(){
      if(this.readyState==4 && this.status==expectedResponse){
        response = JSON.parse(Http.responseText).DataSet.Table;
      }else{
        console.log(Http.responseText);
      }
    }

    Http.send(JSON.stringify(data));

    return response;
  }

  getRequest(access_token, url, expectedResponse = 200){
    const Http = new XMLHttpRequest();
    Http.open("GET", url, false);
    Http.setRequestHeader("Content-type", "application/json; charset=utf-8");
    Http.setRequestHeader("Authorization", 'Bearer ' + access_token);

    let response = {};

    Http.onreadystatechange=function(){
      if(this.readyState==4 && this.status==expectedResponse){
        response = JSON.parse(Http.responseText).DataSet.Table;
      }else{
        console.log(Http.responseText);
      }
    }

    Http.send();

    return response;
  }
}
