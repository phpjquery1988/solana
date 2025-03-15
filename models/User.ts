import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  description: { type: String},
  photo: { type: String},
  publicKey: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);
export default User;
