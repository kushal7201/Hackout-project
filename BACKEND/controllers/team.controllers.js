import express from 'express';
const router = express.Router();
import User from '../models/user.model.js';
import Team from '../models/team.model.js';

router.use(express.json());

const createTeam =
    async (req, res) => {
        try {
            const { name } = req.body;
            const userId = req.userId;
            const user = await User.findById(userId);
            const team = await Team.create({ name });
            team.users.push(user);
            user.team = team;
            user.moviesWatched.forEach((movie) => {
                team.movieWatchlist.push(movie);
            });
            res.status(200).send(team);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error occurred while creating team");
        }
    }

const joinTeam =
    async (req, res) => {
        try {
            const teamId = req.params.teamId;
            const userId = req.userId;
            const thisTeam = await Team.findById(teamId);
            const user = await User.findById(userId);
            if (user && thisTeam) {
                user.team.push(thisTeam);
                thisTeam.users.push(user);
                if (user.team !== teamId) {
                    user.moviesWatched.forEach((movie) => {
                        thisTeam.teamWatchList.push(movie);
                    });
                    res.status(200).send(thisTeam);
                }
                else
                    res.status(401).send('User is already in the team');
            }
            else
                res.status(400).send('User / Team not found');

        } catch (error) {
            console.log(error);
            res.status(500).send("Error occurred while joining team");
        }
    }

export default {
    createTeam,
    joinTeam
};