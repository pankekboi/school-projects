import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllReceipts(){
    return this.http.get(`${this.uri}/receipts/getAllReceipts`);
  }
}
