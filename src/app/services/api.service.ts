import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://tripcraft-production-a972.up.railway.app/api';

  constructor(private http: HttpClient) {}

  // GET
  get(endpoint: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/${endpoint}`
    );
  }

  // POST
  post(endpoint: string, body: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${endpoint}`,
      body
    );
  }

  // PUT
  put(endpoint: string, body: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${endpoint}`,
      body
    );
  }

  // DELETE
  delete(endpoint: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${endpoint}`
    );
  }

  uploadFile(file:File){
    const formData = new FormData();
    formData.append("file",file);
    return this.http.post(
      this.baseUrl+"/upload", formData
    );
  }

  submitVerification(data:any){
    return this.http.post(
      this.baseUrl+"/verify", data
    );
  }

  searchCity(searchText: string) {

    return this.http.get(
      `${this.baseUrl}/sectors/search?term=${searchText}`
    );

  }
}