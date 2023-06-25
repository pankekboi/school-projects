import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  odobriZahtev(id){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/requests/approveRequest`, data);
  }

  izbrisiZahtev(id){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/requests/deleteRequest`, data);
  }
}
