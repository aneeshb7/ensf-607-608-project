import mongoose from "mongoose";

const goalSchema =  new mongoose.Schema({
    currentSaving: { type: Number, required: true },
    categoryID: { type: String, required: true },
    targetAmount: { type: Number, required: true }, 
},
{ timestamps: true });

const Goal = mongoose.model("goals", goalSchema);
export default Goal;