import BudgetCategory from "../models/budgetCategory.js";

// Create a new budget category
export const createBudgetCategory = async (req, res) => {
    try {
        const { name } = req.body; // Get the category name from the request body

        // Create a new budget category
        const newCategory = new BudgetCategory({
            name,
        });

        // Save the new category to the database
        await newCategory.save();

        return res.status(201).json(newCategory); // Return the newly created category
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all budget categories
export const getAllBudgetCategories = async (req, res) => {
    try {
        // Get all categories from the database
        const categories = await BudgetCategory.find();

        return res.status(200).json(categories); // Return the list of categories
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get a single budget category by its ID
export const getBudgetCategoryById = async (req, res) => {
    const { id } = req.params; // Get the category ID from the request parameters

    try {
        // Find the category by ID
        const category = await BudgetCategory.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json(category); // Return the category if found
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update a budget category by its ID
export const updateBudgetCategory = async (req, res) => {
    const { id } = req.params; // Get the category ID from the request parameters
    const { name } = req.body; // Get the new category name from the request body

    try {
        // Find the category and update it
        const updatedCategory = await BudgetCategory.findByIdAndUpdate(
            id,
            { name },
            { new: true } // Ensure the updated category is returned
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json(updatedCategory); // Return the updated category
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete a budget category by its ID
export const deleteBudgetCategory = async (req, res) => {
    const { id } = req.params; // Get the category ID from the request parameters

    try {
        // Find the category by ID and delete it
        const deletedCategory = await BudgetCategory.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json({ message: 'Category successfully deleted' }); // Return a success message
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
