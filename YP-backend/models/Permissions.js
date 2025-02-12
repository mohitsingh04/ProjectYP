import mongoose from "mongoose";

const permissionsSchema = mongoose.Schema({
  uniqueId: {
    type: Number,
  },
  name: { type: String },
  description: { type: String },
  status: { type: String },
});

const Permissions = mongoose.model("permissions", permissionsSchema);
export default Permissions;
