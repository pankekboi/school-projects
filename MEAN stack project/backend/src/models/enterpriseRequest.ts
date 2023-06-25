import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let EnterpriseRequest = new Schema({
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
    }
})

export default mongoose.model('EnterpriseRequest', EnterpriseRequest, 'requests');