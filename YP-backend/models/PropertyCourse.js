import mongoose from 'mongoose';

const PropertyCourseSchema = new mongoose.Schema(
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
        price: {
            type: String,
        },
        duration: {
            type: String,
        },
        course_id: {
            type: Number,
        },
        property_id: {
            type: Number,
        },
        property_name: {
            type: String,
        },
        course_slug: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const PropertyCourse = mongoose.model('PropertyCourse', PropertyCourseSchema);

export default PropertyCourse;