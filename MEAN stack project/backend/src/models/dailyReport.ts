import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let DailyReport = new Schema({
    naziv: {
        type: String
    },
    pib: {
        type: String
    },
    datum: {
        type: Date
    },
    iznos: {
        type: Number
    },
    pdv: {
        type: Number
    }
})

export default mongoose.model('DailyReport', DailyReport, 'dailyReports');