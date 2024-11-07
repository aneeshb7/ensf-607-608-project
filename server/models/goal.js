import mongoose from "mongoose";

const goalSchema =  new mongoose.Schema({
    categoryID: { type: String, required: true },
    targetAmount: { type: Number, required: true }, 
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
{ timestamps: true });

const Goal = mongoose.model("goals", goalSchema);
export default Goal;