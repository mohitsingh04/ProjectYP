import Review from "../models/Reviews.js";

export const addReview = async (req, res) => {
  try {
    const {
      userId,
      property_id,
      name,
      email,
      phone_number,
      gender,
      rating,
      review,
    } = req.body;

    if (
      !userId ||
      !property_id ||
      !name ||
      !email ||
      !phone_number ||
      !rating ||
      !review
    ) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const existPhoneReview = await Review.findOne({ phone_number });
    if (existPhoneReview) {
      return res
        .status(400)
        .json({ error: "Review already exists for this phone number!" });
    }
    const existEmailReview = await Review.findOne({ email });
    if (existEmailReview) {
      return res
        .status(400)
        .json({ error: "Review already exists for this email!" });
    }

    const lastReview = await Review.findOne().sort({ _id: -1 });
    const uniqueId = lastReview ? lastReview.uniqueId + 1 : 1;

    const newReview = new Review({
      userId,
      uniqueId,
      property_id,
      name,
      email,
      phone_number: `+${phone_number}`,
      gender,
      rating,
      review,
    });

    await newReview.save();
    return res.status(201).json({ message: "Review added successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getReview = async (req, res) => {
  try {
    const reviews = await Review.find();

    if (reviews.length === 0) {
      return res.status(404).json({ error: "No reviews found!" });
    }

    return res.status(200).json(reviews);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const { uniqueId } = req.params;

    if (!uniqueId) {
      return res.status(400).json({ error: "Unique ID is required!" });
    }

    const review = await Review.findOne({ uniqueId });

    if (!review) {
      return res.status(404).json({ error: "Review not found!" });
    }

    return res.status(200).json(review);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getReviewByPropertyId = async (req, res) => {
  try {
    let { property_id } = req.params;

    if (!property_id) {
      return res.status(400).json({ error: "Property ID is required!" });
    }

    const reviews = await Review.find({ property_id });

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ error: "No reviews found for this property!" });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const { name, gender, phone_number, rating, review } = req.body;

    if (!uniqueId || !review) {
      return res
        .status(400)
        .json({ error: "Unique ID and review are required." });
    }

    const updateFields = { name, gender, rating, review };

    if (phone_number) {
      updateFields.phone_number = `+${phone_number}`;
    }

    const updatedReview = await Review.findOneAndUpdate(
      { uniqueId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found." });
    }

    return res
      .status(200)
      .json({ message: "Review updated successfully.", review: updatedReview });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { uniqueId } = req.params;

    const deletedReview = await Review.findOneAndDelete({ uniqueId });

    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found." });
    }

    return res.status(200).json({ message: "Review deleted successfully." });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
