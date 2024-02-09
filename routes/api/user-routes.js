const express = require('express');
const router = express.Router();
const { User } = require('../../models'); 
const mongoose = require('mongoose');

// get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get a specific user by username
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// post a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// update a user by username
router.put('/:username', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delete a user by username
router.delete('/:username', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      username: req.params.username,
    });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// add a friend to a user's friend list
router.post('/:username/:friendId', async (req, res) => {
  try {
    const { username } = req.params;
    const friendId = new mongoose.Types.ObjectId(req.params.friendId);

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the friend by ID
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found' });
    }

    // Check if the friend is already in the user's friends list
    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ error: 'Friend already added' });
    }

    // Add the friend to the user's friends list
    user.friends.push(friend._id);
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Delete a friend from the users list
router.delete('/:username/friends/:friendId', async (req, res) => {
  try {
    const { username, friendId } = req.params;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the friend is in the user's friends list
    const friendIndex = user.friends.indexOf(friendId);
    if (friendIndex === -1) {
      return res.status(400).json({ error: 'Friend not found in user\'s friend list' });
    }

    // Remove the friend from the user's friends list
    user.friends.splice(friendIndex, 1);
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;