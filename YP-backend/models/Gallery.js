import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema(
    {
        uniqueId: {
            type: Number,
        },
        title: {
            type: String,
        },
        images: {
            type: Array,
        },
        property_name: {
            type: String,
        },
        property_id: {
            type: String,
        },
        gallerySlug: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Gallery = mongoose.model('Gallery', GallerySchema);

export default Gallery;