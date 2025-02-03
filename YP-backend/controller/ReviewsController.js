import Review from "../models/Reviews.js";

export const getReview = async (req, res) => {
    try {
        const review = await Review.find();
        return res.status(200).json(review);
    } catch (err) {
        console.log(err.message)
        return res.send({ error: "Internal Server Error!" })
    }
};

export const getReviewById = async (req, res) => {
    try {
        const uniqueId = req.params.uniqueId;
        const review = await Review.findOne({ uniqueId: uniqueId });
        return res.status(200).json(review);
    } catch (err) {
        console.log(err.message)
        return res.send({ error: "Internal Server Error!" })
    }
};

export const addReview = async (req, res) => {
    try {
        const { userId, user_name, review, description, mobile_no, email, property_id, property_name } = req.body;
        const kebabCase = property_name.replace(/ /g, "-").toLowerCase();
        const reviews = await Review.findOne().sort({ _id: -1 }).limit(1);
        const existReview = await Review.findOne({ mobile_no: mobile_no });
        const x = reviews ? reviews.uniqueId + 1 : 1;
        const newReview = new Review({
            userId,
            uniqueId: x,
            user_name,
            review,
            description,
            mobile_no,
            email,
            property_id,
            property_name: kebabCase
        })
        if (await newReview.save()) {
            return res.send({ message: "Review added." })
        }
        // if (!existReview) {
        // }
    } catch (err) {
        console.log(err.message)
        return res.send({ error: "Internal Server Error!" })
    }
};

export const updateReview = async (req, res) => {
    try {
        const uniqueId = req.params.uniqueId;
        const { review, description, status } = req.body;
        const updateReview = await Review.findOneAndUpdate(
            { uniqueId: uniqueId },
            {
                $set: {
                    review,
                    description,
                    status
                }
            },
            { new: true }
        );
        if (updateReview) {
            return res.send({ message: "Review updated.", review: updateReview });
        } else {
            return res.send({ error: "Review not found." });
        }
    } catch (err) {
        console.log(err.message)
        return res.send({ error: "Internal Server Error!" })
    }
};

export const deleteReview = async (req, res) => {
    try {
        const uniqueId = req.params.uniqueId;
        await Review.findOneAndDelete({ uniqueId: uniqueId });
        return res.send({ message: "Review deleted." });
    } catch (err) {
        console.log(err.message)
        return res.send({ error: "Internal Server Error!" })
    }
};