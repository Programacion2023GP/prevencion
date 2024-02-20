import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService<T> {

    route: string ='http://127.0.0.1:8000/api'
   //  route: string =  "https://api.prevencion.gomezpalacio.gob.mx/api";
  constructor(private http: HttpClient,private router:Router) {
  }


  Data<T>(url: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    return this.http.get<T>(`${this.route}/${url}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  Post<T>(url: string, params: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    return this.http.post<T>(`${this.route}/${url}`, params, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  Logout(url: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    return this.http.post(`${this.route}/${url}`,"", { headers }).pipe(
      catchError(this.handleError)
    );
  }
  Delete(url:string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    return this.http.post(`${this.route}/${url}`,'', { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  OtherData<T>(url: string) {
    return this.http.get<T>(`${url}`);
  }

  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }
  downloadImage(url: string) {
    return this.http.get(`${this.route}/${url}`, { responseType: 'blob' });
  }
  
    Put(url: string, params: any) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      });
      return this.http.put(`${this.route}/${url}`, params, { headers });
    }
     handleError(error: HttpErrorResponse) {
      if (error.status === 401) {
        localStorage.clear();
        window.location.hash="/login"


      }
      return throwError(error);
    }
}
