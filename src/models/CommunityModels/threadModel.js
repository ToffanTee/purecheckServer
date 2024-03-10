const mongoose = require("mongoose");

const { Schema } = mongoose;

const threadSchema = new Schema(
  {
    title: { type: String, required: true }, // String is shorthand for {type: String}

    author: {
      email: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  },
  { timestamps: true }
);

const Thread = mongoose.model("thread", threadSchema);

module.exports = Thread;
