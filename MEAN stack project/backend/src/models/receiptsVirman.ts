import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ReceiptVirman = new Schema({
    narucioc: {
        type: Object
    }
})

export default mongoose.model('ReceiptVirman', ReceiptVirman, 'receiptsVirman');