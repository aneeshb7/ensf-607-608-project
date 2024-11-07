import Transaction from "../models/transaction.js";

// Create transaction
export const createTransaction = async (req, res) => {
    const { name, date, amount, type } = req.body;
    const userID = req.user.id;  // userID is extracted from JWT payload

    try {
        const newTransaction = new Transaction({ name, date, amount, type, userID });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single transaction by ID
export const getTransaction = async (req, res) => {
    const { id } = req.params;
    const userID = req.user.id;

    try {
        const transaction = await Transaction.findOne({ _id: id, userID });
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all transactions for the authenticated user
export const getAllTransactions = async (req, res) => {
    const userID = req.user.id;

    try {
        const transactions = await Transaction.find({ userID });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update transaction
export const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const userID = req.user.id;

    try {
        const transaction = await Transaction.findOneAndUpdate({ _id: id, userID }, updates, { new: true });
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found or unauthorized" });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    const userID = req.user.id;

    try {
        const transaction = await Transaction.findOneAndDelete({ _id: id, userID });
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found or unauthorized" });
        }
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
