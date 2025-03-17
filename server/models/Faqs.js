import mongoose from 'mongoose';

const FaqsSchema = new mongoose.Schema(
    {
        userId: {
            type: Number,
            required: true,
        },
        uniqueId: {
            type: Number,
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        property_name: {
            type: String,
        },
        property_id: {
            type: String,
            required: true,
        },
        faqsSlug: {
            type: String,
        },
        status: {
            type: String,
            default: "Pending",
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Faqs = mongoose.model('Faqs', FaqsSchema);

export default Faqs;