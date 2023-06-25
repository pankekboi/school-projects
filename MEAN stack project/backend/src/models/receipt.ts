import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Receipt = new Schema({
    naziv: {
        type: String
    },
    lokacija: {
        type: String
    },
    iznos: {
        type: Number
    },
    pdv: {
        type: Number
    },
    datum: {
        type: Date
    },
    stavke: {
        type: Array
    },
    nacinPlacanja: {
        type: String
    }
})

export default mongoose.model('Receipt', Receipt, 'receipts');