import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        console.log(process.env.ATLAS_URI);
        const dbConnect = await mongoose.connect(process.env.ATLAS_URI);
        console.log("here");
        console.log("Connected to database successfully.")
    }
    catch(error) {
        console.log("Database error: " + error);
    }
};

export default dbConnect;