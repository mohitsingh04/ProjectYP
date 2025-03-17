import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema(
    {
        id: {
            type: Number,
        },
        name: {
            type: String,
        },
        iso3: {
            type: String,
        },
        iso2: {
            type: String,
        },
        numeric_code: {
            type: Number,
        },
        phone_code: {
            type: Number,
        },
        capital: {
            type: String,
        },
        currency: {
            type: String,
        },
        currency_name: {
            type: String,
        },
        currency_symbol: {
            type: String,
        },
        region: {
            type: String,
        },
        subregion: {
            type: String,
        },
        nationality: {
            type: String,
        },
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Country = mongoose.model('Country', CountrySchema);

export default Country;