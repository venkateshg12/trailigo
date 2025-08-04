import mongoose from "mongoose"
import { MONGO_URI } from "../constants/env"

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Mongodb connected successfully!");
    }
    catch (error) {
        console.log("Couldn't be able to connect the server", error);
        process.exit(1);
    }
}

export default connectToMongoDB;