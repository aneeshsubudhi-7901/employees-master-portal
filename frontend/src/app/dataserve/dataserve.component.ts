import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-dataserve',
  templateUrl: './dataserve.component.html',
  styleUrls: ['./dataserve.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class DataserveComponent {
  constructor(private http: HttpClient) {}
  users() {
    return this.http.get('http://localhost:3000/employees');
  }
}
