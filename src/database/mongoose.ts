//Imports Mongoose
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); // Add this line to load environment variables

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);


//Defines Database
const mongoDB:string = process.env.MONGODB_URI;

//Connects to mongoDb
const mongooseConnect = async () => {
    
    try {
        await mongoose.connect(mongoDB, {dbName:process.env.MONGODB_DATABASE_NAME})
    } catch (error) {
        throw error;
        
    }
}

export default mongooseConnect;
