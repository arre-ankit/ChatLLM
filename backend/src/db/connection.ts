import { connect, disconnect } from 'mongoose';
import dotenv from 'dotenv';

async function connectToDatabase() {
    try {
        dotenv.config(); // Load environment variables from .env file
        const mongodbUrl = process.env.MONOGODB_URL || ''; // Set a default value if MONOGODB_URL is undefined
        await connect(mongodbUrl);
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to database');
    }
}

async function disconnectToDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error('Error disconnecting to database');
    }

}

export { connectToDatabase, disconnectToDatabase }
