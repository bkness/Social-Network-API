const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const  { formatDate } = require('../utils/helper');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now, get: ts => formatDate(ts) },

    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thoughts = model('thought', thoughtSchema);

module.exports = Thoughts;
