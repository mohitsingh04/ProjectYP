import mongoose from 'mongoose';

const TeachersSchema = new mongoose.Schema(
    {
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
            type: String,
        },
        property_name: {
            type: String,
        },
        property_id: {
            type: Number,
        },
        teacherSlug: {
            type: String,
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

const Teachers = mongoose.model('Teachers', TeachersSchema);

export default Teachers;