import express, { Router } from 'express';
import { errorMiddleware } from './error/error.js';
import dotenv  from 'dotenv';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './db.js';

import cardRoute from "./modules/card/cardRoute.js";
import userRoutes from './modules/authentication/userroute.js'
import favouriteRoute from "./modules/favourite/favouriteRoute.js"
import playlistRoute from './modules/playlist/playlistRoute.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(errorMiddleware);

app.use('/api', userRoutes);
app.use('/api/card', cardRoute);
app.use('/api/favourite', favouriteRoute);
app.use('/api/playlist', playlistRoute);

connectDB();

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});


