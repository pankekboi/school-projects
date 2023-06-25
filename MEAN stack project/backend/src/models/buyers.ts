import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Buyers = new Schema({
    idPreduzeca: {
        type: Number
    },
    narucioci: {
        type: Array
    }
})

export default mongoose.model('Buyers', Buyers, 'buyers');