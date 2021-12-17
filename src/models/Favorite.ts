import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema(
  {
    profile_id: String,
    name: String,
    favorites: [{
      type: String
    }]
  },
  {
    timestamps: true,
  }
);

export const Favorite = mongoose.model("Favorite", schema);
