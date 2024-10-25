import mongoose from "mongoose";

const incomeSchema =  new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true }, 
},
{ timestamps: true });

const Income = mongoose.model("incomes", incomeSchema);
export default Income; 