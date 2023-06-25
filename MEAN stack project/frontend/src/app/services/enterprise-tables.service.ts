import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseTablesService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllLocations(idPreduzeca){
    const data = {
      idPreduzeca: idPreduzeca
    }

    return this.http.post(`${this.uri}/tables/getAllLocations`, data);
  }

  addLocation(idPreduzeca, lokacija){
    const data = {
      idPreduzeca: idPreduzeca,
      lokacija: lokacija
    }

    return this.http.post(`${this.uri}/tables/addLocation`, data);
  }
}
