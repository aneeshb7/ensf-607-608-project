import mongoose from "mongoose";

const accountSchema =  new mongoose.Schema({
    accountNumber: { type: Number, required: true, unique: true },
    balance: { type: Number, required: true },
},
{ timestamps: true });

const Account = mongoose.model("accounts", accountSchema);
export default Account;