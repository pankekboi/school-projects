import { ItemReceipt } from "./itemReceipt";

export class Receipt{
    _id: string;
    naziv: string;
    lokacija: string;
    iznos: number;
    pdv: number;
    datum: Date;
    stavke: Array<ItemReceipt>
    nacinPlacanja: string;
}