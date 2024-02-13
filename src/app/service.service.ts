import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService<T> {
 
  route: string =' http://127.0.0.1:8000/api'
    // route: string =  "https://api.resguardosinternos.gomezpalacio.gob.mx/api";
  constructor(private http: HttpClient) { 
  }

  
  Data<T>(url: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    return this.http.get<T>(`${this.route}/${url}`, { headers });
  }
  OtherData<T>(url: string) {
    return this.http.get<T>(`${url}`);
  }
  Post<T>(url: string, params: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    return this.http.post<T>(`${this.route}/${url}`, params, { headers });
  }
  
  Logout(url: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    return this.http.post(`${this.route}/${url}`,"", { headers });
  }

  Put(url: string, params: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    return this.http.put(`${this.route}/${url}`, params, { headers });
  }
  Delete(url:string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    return this.http.post(`${this.route}/${url}`,'', { headers });
  }

  
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }
  downloadImage(url: string) {
    return this.http.get(`${this.route}/${url}`, { responseType: 'blob' });
  }
}