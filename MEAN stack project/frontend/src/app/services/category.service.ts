import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  getAllCategories(id){
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/categories/getAllCategories`, data);
  }

  addCategory(id, naziv){
    const data = {
      id: id,
      naziv: naziv
    }

    return this.http.post(`${this.uri}/categories/addCategory`, data);
  }

  addItemToCategory(id, naziv, artikal){
    const data = {
      id: id,
      naziv: naziv,
      artikal: artikal
    }

    return this.http.post(`${this.uri}/categories/addItemToCategory`, data);
  }
}
