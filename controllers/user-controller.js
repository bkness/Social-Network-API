const { User } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v -password')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // get a single user by username
  getUserByUsername({ params }, res) {
    User.findOne({ username: params.username })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v -password')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // create a new user
  createUser({ body }, res) {
    User.create(body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // update a user by username
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ username: params.username }, body, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // delete a user by username
  deleteUser({ params }, res) {
    User.findOneAndDelete({ username: params.username })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        // delete user's associated thoughts 
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // add a friend to a user's friend list
  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { username: params.username },
      { $push: { friends: body.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // remove a friend from a user's friend list
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { username: params.username },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
