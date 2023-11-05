import express from 'express';
const router = express.Router();
import User from '../models/user.model.js';
import Movie from '../models/movie.model.js';

router.use(express.json());

const getHomepage =
    async (req, res) => {
        try {
            const user = await User.findById(req.userId);
            if (user.team) {
                console.log(user);
                res.status(200).send(user.team.movieWatchlist);
            }
            else {
                console.log(user);
                res.status(200).send('You have not joined any team');
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Error occurred while fetching movies");
        }
    }

const postHomepage =
    async (req, res) => {
        try {
            const movieId = req.query.movie;
            const userId = req.userId;
            const user = await User.findById(userId);
            const movie = await Movie.create({ apiMovieId: movieId });
            movie.usersWhoWatched.push(user);
            user.moviesWatched.push(movie);
            if (user.team) {
                if (!user.team.movieWatchlist)
                    user.team.movieWatchlist = [];

                user.team.movieWatchlist.push(movie);
            }
            res.send(user);
            console.log(user);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error occurred ");
        }
    }

export default {
    getHomepage,
    postHomepage
};