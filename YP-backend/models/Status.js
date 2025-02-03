import mongoose from 'mongoose';

const StatusSchema = new mongoose.Schema(
    {
        uniqueId: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Status = mongoose.model('Status', StatusSchema);

export default Status;