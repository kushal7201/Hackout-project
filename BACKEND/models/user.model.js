import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 4,
        default: null
    },
    token: {
        type: String,
        default: null
    },
    moviesWatched: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }]
});

const User = mongoose.model('User', userSchema);
export default User;