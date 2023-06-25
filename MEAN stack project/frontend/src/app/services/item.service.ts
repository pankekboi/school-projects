import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllItems(idPreduzeca){
    const data = {
      idPreduzeca: idPreduzeca
    }

    return this.http.post(`${this.uri}/users/getAllItems`, data);
  }

  getAllItemsStorageLocations(idPreduzeca){
    const data = {
      idPreduzeca: idPreduzeca
    }

    return this.http.post(`${this.uri}/users/getAllItemsStorageLocations`, data);
  }

  addItem(data){
    return this.http.post(`${this.uri}/users/addItem`, data);
  }

  changeItem(data){
    return this.http.post(`${this.uri}/users/changeItem`, data);
  }

  removeItem(data){
    return this.http.post(`${this.uri}/users/removeItem`, data);
  }
}
