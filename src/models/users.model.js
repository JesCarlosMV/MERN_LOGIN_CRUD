import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    nick: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
