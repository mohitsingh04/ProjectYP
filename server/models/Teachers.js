import mongoose from "mongoose";

const TeachersSchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  uniqueId: {
    type: Number,
    required: true,
  },
  teacher_name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  profile: {
    type: Array,
  },
  property_id: {
    type: Number,
  },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Teachers = mongoose.model("Teachers", TeachersSchema);

export default Teachers;
