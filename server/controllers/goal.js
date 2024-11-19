import Goal from "../models/goal.js";

// Create goal
export const createGoal = async (req, res) => {
    const { categoryID, targetAmount } = req.body;
    const userID = req.user.id;

    try {
        const newGoal = new Goal({ categoryID, targetAmount, userID });
        await newGoal.save();
        res.status(201).json(newGoal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single goal by ID
export const getGoal = async (req, res) => {
    const { id } = req.params;
    const userID = req.user.id;

    try {
        const goal = await Goal.findOne({ _id: id, userID });
        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }
        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all goals for the authenticated user
export const getAllGoals = async (req, res) => {
    const { id } = req.params;
    const userID = id;

    try {
        const goals = await Goal.find({ userID });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update goal
export const updateGoal = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const userID = req.user.id;

    try {
        const goal = await Goal.findOneAndUpdate({ _id: id, userID }, updates, { new: true });
        if (!goal) {
            return res.status(404).json({ message: "Goal not found or unauthorized" });
        }
        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete goal
export const deleteGoal = async (req, res) => {
    const { id } = req.params;
    const userID = req.user.id;

    try {
        const goal = await Goal.findOneAndDelete({ _id: id, userID });
        if (!goal) {
            return res.status(404).json({ message: "Goal not found or unauthorized" });
        }
        res.status(200).json({ message: "Goal deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
