import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServicesProducts {

  public emitEvent = new EventEmitter();

  url:string = 'http://localhost:10000'

  constructor(private http: HttpClient,
    private router: Router) { }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  public getAllProducts(){
    return this.http.get<any>(`${this.url}/produtos/all`,{headers: this.httpOptions.headers})
    .pipe(
      res => res,
      error => error
    )
  }

  public editProduct(payload:{cod:number,nome:string,preco:number,desc:string}){
    return this.http.post<any>(`${this.url}/produtos/edit`,payload,{headers: this.httpOptions.headers})
    .pipe(
      res => res,
      error => error
    )
  }

  public addProduct(payload:{nome:string,preco:number,desc:string}){
    return this.http.post<any>(`${this.url}/produtos/add`,payload,{headers: this.httpOptions.headers})
    .pipe(
      res => res,
      error => error
    )
  }

  public deleteProduct(payload:{cod:number}){
    return this.http.post<any>(`${this.url}/produtos/delete`,payload,{headers: this.httpOptions.headers})
    .pipe(
      res => res,
      error => error
    )
  }
}
