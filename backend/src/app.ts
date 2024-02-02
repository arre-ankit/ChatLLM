import express from 'express';
import { config } from 'dotenv';
import cors from 'cors'; // Add the import statement for cors
import appRouter from './routes/index';
import bodyParser from 'body-parser';


config();
const app = express();

app.use(cors()); // Add this line below app.use(express.json());

app.use(express.json()); //middleware
app.use(bodyParser.json());

app.use('/api/v1', appRouter);


export default app;