import mongoose from 'mongoose';

const SearchSchema = new mongoose.Schema(
    {
        uniqueId: {
            type: Number,
            required: true,
        },
        search: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Search = mongoose.model('Search', SearchSchema);

export default Search;