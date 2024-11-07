import User from "../models/user.js";

//Get user
export const getUser = async (req, res) => {
    try {
       const { id } = req.params;

       //Get user from db
       const user = await User.findById(id);
       const formattedUser = { 
        id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email, 
        }
       res.status(200).json(formattedUser);
    }
    catch(error) {
        res.status(404).json({ message: error.message });
    }
};


//Update user
export const updateUser = async (req, res) => {
    const { id } = req.params; // Extract the user ID from the request parameters
    const updates = req.body; // Extract the updated user object from the request body
  
    //Validate user identity
    if(id != req.user.id) {
        return res.status(403).json({ message: 'Unauthorized: User can only update their own account' });
    }
    
    try {
      // Find the user document by ID and replace it with the updated user object
      const user = await User.findByIdAndUpdate(id, updates, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the updated user document
      res.status(200).json(user);
    } catch (error) {
      // If an error occurs during the update process, return an error response
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//Delete user
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    //Validate user identity
    if(id != req.user.id) {
        return res.status(403).json({ message: 'Unauthorized: User can only delete their own account' });
    }

    //Delete user from db
    try {
        await User.findByIdAndDelete(id);
        res.json(200).json({ message: 'User was successfully deleted'})
    }
    catch(error) {
        res.status(404).json({ message: error.message });
    }
};