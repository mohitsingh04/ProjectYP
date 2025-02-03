import mongoose from 'mongoose';

const SeoSchema = new mongoose.Schema(
    {
        uniqueId: {
            type: Number,
        },
        title: {
            type: String,
        },
        slug: {
            type: String,
        },
        meta_tags: {
            type: String,
        },
        description: {
            type: String,
        },
        primary_focus_keyword: {
            type: String,
        },
        json_schema: {
            type: String,
        },
        course_id: {
            type: String,
        },
        course_name: {
            type: String,
        },
        property_id: {
            type: String,
        },
        property_name: {
            type: String,
        },
        seoSlug: {
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

const Seo = mongoose.model('Seo', SeoSchema);

export default Seo;