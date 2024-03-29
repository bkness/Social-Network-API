const express = require('express');
const router = express.Router();
const { Thoughts, User } = require('../../models'); 

// get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thoughts.find();
    res.json(thoughts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get a specific thought by ID
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thoughts.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new thought
router.post('/', async (req, res) => {
  try {
    const newThought = await Thoughts.create(req.body);
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { thoughts: newThought._id } },
      { new: true }
    );
    res.json(newThought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// update a thought by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedThought = await Thoughts.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delete a thought by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedThought = await Thoughts.findByIdAndDelete(req.params.id);
    if (!deletedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(deletedThought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// add reaction to thought ID 
router.post('/:id/reactions', async (req, res) => {
  try {
    const thoughtId = req.params.id;
    const { reactionBody, username } = req.body;

    // find the thought by ID 
    const thought = await Thoughts.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found!' });
    }
    // add reaction to thoughts reaction array 
    thought.reactions.push({ reactionBody, username });
    await thought.save();

    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Oops, something went wrong'})
  }
});

// delete a reaction from a thought 
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;

    // find the thought by ID 
    const thought = await Thoughts.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found!' });
    }

    // remove the reaction from the thought's reactions array 
    thought.reactions = thought.reactions.filter(reaction => !reaction.reactionId.equals(reactionId));
    await thought.save();

    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Oops, something went wrong'})
  }
});

module.exports = router;