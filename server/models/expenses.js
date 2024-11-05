import mongoose from "mongoose";

const expenseSchema =  new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true }, 
},
{ timestamps: true });

const Expense = mongoose.model("expenses", expenseSchema);
export default Expense; 