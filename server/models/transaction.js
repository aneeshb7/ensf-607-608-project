import mongoose from "mongoose";

const transactionSchema =  new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true }, 
    type: { type: String, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
{ timestamps: true });

const Transaction = mongoose.model("transactions", transactionSchema);
export default Transaction;