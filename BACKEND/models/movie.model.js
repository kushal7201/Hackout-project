import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    apiMovieId: {
        type: String,
        required: true
    },
    usersWhoWatched: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;