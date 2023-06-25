import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Categories = new Schema({
    idPreduzeca: {
        type: Number
    },
    kategorije: {
        type: Array
    }
})

export default mongoose.model('Categories', Categories, 'categories');