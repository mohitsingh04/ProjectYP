import mongoose from "mongoose";
const AchievementsSchema = mongoose.Schema({
  property_id: {
    type: Number,
    required: true,
  },
  uniqueId: {
    type: Number,
    required: true,
  },
  achievements: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Achievements = mongoose.model("Achievements", AchievementsSchema);

export default Achievements;
