import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllReceiptsToday(datum, nazivPreduzeca){
    const data = {
      datum: datum,
      nazivPreduzeca: nazivPreduzeca
    }

    return this.http.post(`${this.uri}/receipts/getAllReceiptsToday`, data);
  }

  getAllReceiptsDate(naziv, pib, datumPocetka, datumKraja){
    const data = {
      naziv: naziv,
      pib: pib,
      datumPocetka: datumPocetka,
      datumKraja: datumKraja
    }

    return this.http.post(`${this.uri}/receipts/getAllReceiptsDate`, data);
  }

  getAllReceiptsForCustomer(brojLK){
    const data = {
      brojLK: brojLK
    }

    return this.http.post(`${this.uri}/receipts/getAllReceiptsForCustomer`, data);
  }

  addToDailyReport(naziv, pib, datum, iznos, pdv){
    const data = {
      naziv: naziv,
      pib: pib,
      datum: datum,
      iznos: iznos,
      pdv: pdv
    }

    return this.http.post(`${this.uri}/receipts/addToDailyReport`, data);
  }

  addReceiptCash(racun, placeno, brojLK, kusur){
    const data = {
      racun: racun,
      placeno: placeno,
      brojLK: brojLK,
      kusur: kusur
    }

    return this.http.post(`${this.uri}/receipts/addReceiptCash`, data);
  }

  addReceiptCheck(racun, imeKupca, prezimeKupca, brojLK){
    const data = {
      racun: racun,
      imeKupca: imeKupca,
      prezimeKupca: prezimeKupca,
      brojLK: brojLK
    }

    return this.http.post(`${this.uri}/receipts/addReceiptCheck`, data);
  }

  addReceiptCard(racun, brojLK, brojSlip){
    const data = {
      racun: racun,
      brojLK: brojLK,
      brojSlip: brojSlip
    }

    return this.http.post(`${this.uri}/receipts/addReceiptCard`, data);
  }

  addReceiptVirman(racun, narucioc){
    const data = {
      racun: racun,
      narucioc: narucioc
    }

    return this.http.post(`${this.uri}/receipts/addReceiptVirman`, data);
  }
}
