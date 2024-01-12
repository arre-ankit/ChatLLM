import express from 'express';
import { config } from 'dotenv';
import appRouter from './routes/index';

config();
const app = express();

app.use(express.json()); //middleware

app.use('/api/v1', appRouter);


export default app;