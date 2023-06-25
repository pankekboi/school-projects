import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    id: {
        type: Number
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    tip: {
        type: Number
    }
})

export default mongoose.model('User', User, 'users');