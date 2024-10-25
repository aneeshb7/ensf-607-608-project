import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import records from "./routes/record.js";
import dbConnect from "./db/connection.js";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// connect to mongodb
dbConnect();

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});