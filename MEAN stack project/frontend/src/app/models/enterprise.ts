import { cashRegister } from "./cashRegister";
import { Storage } from "./storage";

export class Enterprise{
    id: number;
    ime: string;
    prezime: string;
    username: string
    password: string;
    telefon: string;
    email: string;
    nazivPreduzeca: string;
    adresaPreduzeca: string;
    pib: string;
    maticniBroj: string
    logo: string;
    status: string
    kategorija: string
    sifreDelatnosti: string;
    uPDVsistemu: boolean;
    ziroRacuni: string;
    magacini: Array<Storage>
    kase: Array<cashRegister>
}