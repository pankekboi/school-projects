import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ReceiptCard = new Schema({
    brojLK: {
        type: String
    },
    brojSlip: {
        type: String
    }
})

export default mongoose.model('ReceiptCard', ReceiptCard, 'receiptsCard');