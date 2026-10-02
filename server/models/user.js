import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    email: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 3,
      max: 64,
    },
    picture: {
      type: String,
      default: "/avatar.png",
    },
    role: {
      type: [String],
      default: ["Subscriber"],
      enum: ["Subscriber", "Intructor", "Admin"],
    },
    stripe_account_id: {},
    stripe_seller: {},
    stripSession: {},
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
