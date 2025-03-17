import mongoose from 'mongoose';

const StateSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
        },
        name: {
            type: String,
        },
        country_id: {
            type: Number,
        },
        country_code: {
            type: String,
        },
        country_name: {
            type: String,
        },
        state_code: {
            type: String,
        },
        type: {
            type: String,
        },
        latitude: {
            type: String,
        },
        longitude: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const State = mongoose.model('State', StateSchema);

export default State;