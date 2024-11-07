import Account from "../models/account.js";

// Create account
export const createAccount = async (req, res) => {
    const { accountID, accountNumber, balance } = req.body;
    const userID = req.user.id;  // userID is extracted from JWT payload

    try {
        const newAccount = new Account({ accountID, accountNumber, balance, userID });
        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get account by ID
export const getAccount = async (req, res) => {
    const { id } = req.params;
    const userID = req.user.id;

    try {
        const account = await Account.findOne({ _id: id, userID });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all accounts for the authenticated user
export const getAllAccounts = async (req, res) => {
    const userID = req.user.id;

    try {
        const accounts = await Account.find({ userID });
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update account
export const updateAccount = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const userID = req.user.id;

    try {
        const account = await Account.findOneAndUpdate({ _id: id, userID }, updates, { new: true });
        if (!account) {
            return res.status(404).json({ message: "Account not found or unauthorized" });
        }
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete account
export const deleteAccount = async (req, res) => {
    const { id } = req.params;
    const userID = req.user.id;

    try {
        const account = await Account.findOneAndDelete({ _id: id, userID });
        if (!account) {
            return res.status(404).json({ message: "Account not found or unauthorized" });
        }
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
