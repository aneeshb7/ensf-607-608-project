import mongoose from "mongoose";

const accountSchema =  new mongoose.Schema({
    accountID: { type: Number, required: true, unique: true },
    accountNumber: { type: Number, required: true },
    balance: { type: Number, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
{ timestamps: true });

const Account = mongoose.model("accounts", accountSchema);
export default Account;