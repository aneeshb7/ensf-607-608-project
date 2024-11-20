import { GoogleGenerativeAI } from "@google/generative-ai";
import Transaction from "../models/transaction.js";
import { json } from "express";

export const generateResponse = async (req, res) => {
    try {
        const { prompt } = req.body;
        if(!prompt) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
        const result = await model.generateContent(prompt);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error." });
    }
};

// Get user transactions for the month
export const getUserTransactionsForMonth = async (userId, month, year) => {
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0);

  const transactions = await Transaction.find({
    userID: userId,
    date: { $gte: startOfMonth, $lt: endOfMonth },
    type: "Expense",
  }).exec();

  const transactionData = transactions.map(transaction => {
    return `Transaction: ${transaction.name}, Amount: $${transaction.amount}, Category: ${transaction.category}`;
  }).join("\n");

  return transactionData;
};

// Generate budget using Gemini API
export const generateBudget = async (req, res) => {
    const { userID, month, year } = req.body;
  try {
    // Get the user's transactions for the specified month
    const transactions = await getUserTransactionsForMonth(userID, month, year);

    const prompt = 
    `Based on the following list of transactions, generate a monthly budget for the user in JSON format. The budget should categorize each expense and show the total allocated for each category, along with suggestions for adjustments where applicable.

    Categories to consider:
    1. Food
    2. Luxury
    3. Transportation
    4. Entertainment
    5. Utilities
    6. Health
    7. Other
    
    For each category, provide:
    1. Total spent in the category during the month.
    2. Recommended budget for the category in the future.
    3. Suggestions for savings or adjustments.
    
    Output the data as a JSON object with this structure:
    {
        "categories": [
            {
                "category": "Food",
                "totalSpent": 435.00,
                "recommendedBudget": 350.00,
                "suggestions": "Consider meal planning to reduce impulse grocery purchases."
            },
            {
                "category": "Luxury",
                "totalSpent": 0.00,
                "recommendedBudget": 100.00,
                "suggestions": "Allocate a small amount for occasional luxuries."
            }
            // Repeat for other categories...
        ],
        "summary": {
            "totalSpent": 435.00,
            "totalRecommendedBudget": 1025.00,
        }
    }
    
    Transaction List: ${JSON.stringify(transactions)}
    `;
        
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

    const result = await model.generateContent(prompt);

    // Extract the response from the API
    if (result) {
      const budgetResponse = result.response.text();
      const cleanedResponse = budgetResponse.replace(/```json|```/g, '').trim();
    
      const jsonResponse = JSON.parse(cleanedResponse);
      res.status(200).json(jsonResponse);
      return jsonResponse;
    } else {
      throw new Error('No response from Gemini API');
    }
  } catch (error) {
    console.error('Error generating budget:', error);
  }
};
