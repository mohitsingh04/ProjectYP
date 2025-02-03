import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
    {
        userId: {
            type: Number,
        },
        uniqueId: {
            type: Number,
        },
        course_type: {
            type: String,
        },
        course_name: {
            type: String,
        },
        course_short_name: {
            type: String,
        },
        price: {
            type: String,
        },
        duration: {
            type: String,
        },
        description: {
            type: String,
        },
        property_id: {
            type: Number,
        },
        property_name: {
            type: String,
        },
        course_level: {
            type: String
        },
        course_slug: {
            type: String,
        },
        image: {
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

const Course = mongoose.model('Course', CourseSchema);

export default Course;