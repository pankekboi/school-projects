import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Customer = new Schema({
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
    brojLK: {
        type: String
    }
})

export default mongoose.model('Customer', Customer, 'customers');