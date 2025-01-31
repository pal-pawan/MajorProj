import mongoose from 'mongoose';
require('dotenv').config();

type ConnectionObject = {
    isConnected?: number;
};

const connection:ConnectionObject = {};

async function dbconnect():Promise<void> {
    if(connection.isConnected){
        console.log("already connected to database");
        return;
    }
    else {
        try {
            const dbConnection = await mongoose.connect(process.env.MONGODB_URI as string || "",{});
            connection.isConnected = dbConnection.connections[0].readyState;
            console.log("connected to database successfully");
        } catch (error) {
            console.log("error in connecting to database", error);
            process.exit(1);
        }
    }
}

export default dbconnect;
