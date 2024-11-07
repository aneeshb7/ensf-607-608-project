import mongoose from "mongoose";

const budgetCategorySchema =  new mongoose.Schema({
    name : { type: String, required: true }, 
},
{ timestamps: true });

const BudgetCategory = mongoose.model("budgetCategories", budgetCategorySchema);
export default BudgetCategory;