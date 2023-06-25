import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Enterprise = new Schema({
    id: {
        type: Number
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    telefon: {
        type: String
    },
    email: {
        type: String
    },
    nazivPreduzeca: {
        type: String
    },
    adresaPreduzeca: {
        type: String
    },
    pib: {
        type: String
    },
    maticniBroj: {
        type: String
    },
    logo: {
        type: String
    },
    status: {
        type: String
    },
    kategorija: {
        type: String
    },
    sifreDelatnosti: {
        type: String
    },
    uPDVsistemu: {
        type: Boolean
    },
    ziroRacuni: {
        type: String
    },
    magacini: {
        type: Array
    },
    kase: {
        type: Array
    }
})

export default mongoose.model('Enterprise', Enterprise, 'enterprises');