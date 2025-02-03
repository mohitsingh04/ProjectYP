import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        uniqueId: {
            type: Number,
        },
        user_name: {
            type: String,
        },
        review: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        mobile_no: {
            type: Number
        },
        email: {
            type: String
        },
        property_name: {
            type: String,
        },
        property_id: {
            type: Number,
        },
        status: {
            type: String,
            default: "Pending"
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Review = mongoose.model('Review', ReviewSchema);

export default Review;