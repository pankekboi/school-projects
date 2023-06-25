import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let EnterpriseItem = new Schema({
    idPreduzeca: {
        type: Number
    },
    artikli: {
        type: Array
    }
})

export default mongoose.model('EnterpriseItem', EnterpriseItem, 'enterpriseItems');