import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const userAuth = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            res.status(401).send("Please login to access the page.");
        }
        const actualToken = token.split(" ")[1];
        const payload = jwt.verify(actualToken, process.env.JWT_SECRET_KEY);
        const userId = payload.id;
        req.userId = userId;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send("Error while verifying token.");
    }
}

export default userAuth;