import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000/employees';
  urlMan = 'http://localhost:3000/managers';
  getData(): Observable<any> {
    return this.http.get(this.url);
  }
  // async getData(): Promise<any> {
  //   return await this.http.get(this.url);
  // }
  postData(obj: any): Observable<any> {
    return this.http.post(this.url, obj);
  }

  getDataById(_id: string): Observable<any> {
    console.log(_id);
    console.log(`${this.url}/${_id}`);
    return this.http.get(`${this.url}/${_id}`);
  }

  updateData(_id: string, obj: any): Observable<any> {
    // console.log(obj);
    // console.log(_id);
    // console.log(`${this.url}/${_id}`);
    return this.http.put(`${this.url}/${_id}`, obj);
  }

  deleteData(_id: string): Observable<any> {
    return this.http.delete(`${this.url}/${_id}`);
  }

  getHierarchy(_id: string): Observable<any> {
    return this.http.get(`${this.url}/hierarchy/${_id}`);
  }

  getManager(_id: string): Observable<any> {
    return this.http.get(`${this.url}/${_id}`);
  }
}
