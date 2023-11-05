import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import IndexRoutes from '../routes/index.js'
import connectDB from '../config/db.js';
import path from 'path'
dotenv.config();
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Url
app.use("/api", IndexRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
})