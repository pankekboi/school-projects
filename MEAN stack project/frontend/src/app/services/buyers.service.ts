import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuyersService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllBuyers(id){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/buyers/getAllBuyers`, data)
  }

  addBuyer(id, pib, brojDanaZaPlacanje, rabat){
    const data = {
      id: id,
      pib: pib,
      brojDanaZaPlacanje: brojDanaZaPlacanje,
      rabat: rabat
    }

    return this.http.post(`${this.uri}/buyers/addBuyer`, data)
  }
}
