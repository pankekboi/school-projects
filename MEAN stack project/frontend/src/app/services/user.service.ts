import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  login(username, password){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/login`, data);
  }

  checkUsername(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/users/checkUsername`, data);
  }

  checkEmail(email){
    const data = {
      email: email
    }

    return this.http.post(`${this.uri}/users/checkEmail`, data);
  }

  register(name, lastname, username, password, phone, email, enterpriseName, hqAddr, pib, hqNumber, logo){
    const uploadData = new FormData();

    uploadData.append('name', name);
    uploadData.append('lastname', lastname);
    uploadData.append('username', username);
    uploadData.append('password', password);
    uploadData.append('phone', phone);
    uploadData.append('email', email);
    uploadData.append('enterpriseName', enterpriseName);
    uploadData.append('hqAddr', hqAddr);
    uploadData.append('pib', pib);
    uploadData.append('hqNumber', hqNumber);
    uploadData.append('logo', logo);

    return this.http.post(`${this.uri}/users/register`, uploadData);
  }

  getEnterpriseById(id){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/users/getEnterpriseById`, data);
  }

  getEnterpriseByPIB(pib){
    const data = {
      pib: pib
    }

    return this.http.post(`${this.uri}/users/getEnterpriseByPIB`, data)
  }

  getEnterprise(ime, prezime, username, telefon, email, nazivPreduzeca, adresaPreduzeca, pib, maticniBroj){
    const data = {
      ime: ime,
      prezime: prezime,
      username: username,
      telefon: telefon,
      email: email,
      nazivPreduzeca: nazivPreduzeca,
      adresaPreduzeca: adresaPreduzeca,
      pib: pib,
      maticniBroj: maticniBroj
    }

    return this.http.post(`${this.uri}/users/getEnterprise`, data)
  }

  getCustomer(id){
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/users/getCustomer`, data);
  }

  getAllEnterprises(){
    return this.http.get(`${this.uri}/users/getAllEnterprises`);
  }

  getAllRequests(){
    return this.http.get(`${this.uri}/users/getAllRequests`);
  }

  updateEnterpriseData(id, kategorija, sifreDelatnosti, ziroRacuni, uPDVsistemu, magacini, kase){
    const data = {
      id: id,
      kategorija: kategorija,
      sifreDelatnosti: sifreDelatnosti,
      ziroRacuni: ziroRacuni,
      uPDVsistemu: uPDVsistemu,
      magacini: magacini,
      kase: kase
    }

    return this.http.post(`${this.uri}/users/updateEnterpriseData`, data);
  }

  changePassword(id, password){
    const data = {
      id: id,
      password: password
    }

    return this.http.post(`${this.uri}/users/changePassword`, data)
  }

  updateStorageState(id, magacini, kase){
    const data = {
      id: id,
      magacini: magacini,
      kase: kase
    }

    return this.http.post(`${this.uri}/users/updateStorageState`, data)
  }

  updateStorageStateLocation(id, kase){
    const data = {
      id: id,
      kase: kase
    }

    return this.http.post(`${this.uri}/users/updateStorageStateLocation`, data);
  }

  addCustomer(ime, prezime, username, password, telefon, brojLK){
    const data = {
      ime: ime,
      prezime: prezime,
      username: username,
      password: password,
      telefon: telefon,
      brojLK: brojLK
    }

    return this.http.post(`${this.uri}/users/addCustomer`, data);
  }

  addEnterprise(data){
    return this.http.post(`${this.uri}/users/addEnterprise`, data);
  }
}
