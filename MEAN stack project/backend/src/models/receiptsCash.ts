import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ReceiptCash = new Schema({
    placeno: {
        type: Number
    },
    brojLK: {
        type: String
    },
    kusur: {
        type: Number
    }
})

export default mongoose.model('ReceiptCash', ReceiptCash, 'receiptsCash');