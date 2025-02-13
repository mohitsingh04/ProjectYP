import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uniqueId: {
    type: Number,
  },
  profile: {
    type: Array,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  mobile_no: {
    type: Number,
  },
  address: {
    type: String,
    default: null,
  },
  pincode: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: null,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "User",
  },
  resetToken: {
    type: String,
    default: null,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verifyToken: {
    type: String,
  },
  verifyTokenExpiry: {
    type: Date,
  },
  permissions: {
    type: Array,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
