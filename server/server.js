import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./db/connection.js";
import authentication from "./routes/authentication.js";
import user from "./routes/user.js";
import account from "./routes/account.js";
import transaction from "./routes/transaction.js";
import goal from "./routes/goal.js";
import budgetCategory from './routes/budgetCategory.js';
import gemini from "./routes/gemini.js";


dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/authentication", authentication);
app.use("/api/user", user);
app.use("/api/account", account);
app.use("/api/transaction", transaction);
app.use("/api/goal", goal);
app.use("/api/budget-categories", budgetCategory);
app.use("/api/gemini", gemini);

// connect to mongodb
dbConnect();

// start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});