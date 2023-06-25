import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ReceiptCheck = new Schema({
    imeKupca: {
        type: String
    },
    prezimeKupca: {
        type: String
    },
    brojLK: {
        type: String
    }
})

export default mongoose.model('ReceiptCheck', ReceiptCheck, 'receiptsCheck');