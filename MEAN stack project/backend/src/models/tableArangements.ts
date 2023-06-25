import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let TableArangements = new Schema({
    idPreduzeca: {
        type: Number
    },
    objekti: {
        type: Array
    }
})

export default mongoose.model('TableArangements', TableArangements, 'tableArangements');