import mongoose from 'mongoose';

const BusinessHourSchema = new mongoose.Schema(
    {
        // uniqueId: {
        //     type: Number,
        // },
        // day: {
        //     type: String,
        // },
        // openTime: {
        //     type: String,
        // },
        // closeTime: {
        //     type: String,
        // },
        // property_id: {
        //     type: String,
        // },
        // property_name: {
        //     type: String,
        // },
        monday: { open: String, close: String },
        tuesday: { open: String, close: String },
        wednesday: { open: String, close: String },
        thursday: { open: String, close: String },
        friday: { open: String, close: String },
        saturday: { open: String, close: String },
        sunday: { open: String, close: String },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const BusinessHour = mongoose.model('BusinessHour', BusinessHourSchema);

export default BusinessHour;