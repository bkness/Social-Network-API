const { Thoughts, User } = require('../models');

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({
        path: 'reactions',
        select: '-_id -__v',
      })
      .select('-__v')
      .sort({ createdAt: -1 })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought by id
  getThoughtById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-_id -__v',
      })
      .select('-__v')
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a new thought
  createThought({ body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought by id
  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought by id
  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        return User.findOneAndUpdate(
          { username: thought.username },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Add a reaction to a thought
  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Remove a reaction from a thought
  removeReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
