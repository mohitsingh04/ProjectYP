import Faqs from "../models/Faqs.js";

export const getFaq = async (req, res) => {
  try {
    const faqs = await Faqs.find();
    return res.status(200).json(faqs);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error!" });
  }
};

export const getFaqById = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const faqs = await Faqs.findOne({ _id: objectId });
    return res.status(200).json(faqs);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error!" });
  }
};

export const addFaq = async (req, res) => {
  try {
    const { userId, question, answer, property_id, property_name } = req.body;
    const slug = question.replace(/ /g, "-").toLowerCase();
    const kebabCase = property_name.replace(/ /g, "-").toLowerCase();
    const faqs = await Faqs.findOne().sort({ _id: -1 }).limit(1);
    const x = faqs ? faqs.uniqueId + 1 : 1;
    const existFaq = await Faqs.findOne({
      question: question,
      property_id: property_id,
    });
    if (!existFaq) {
      const newFaq = new Faqs({
        userId,
        uniqueId: x,
        question,
        answer,
        property_id,
        property_name: kebabCase,
        faqsSlug: slug,
      });
      if (await newFaq.save()) {
        return res.send({ message: "Question Added." });
      }
    } else {
      return res.send({ error: "This question is alredy exist!" });
    }
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error!" });
  }
};

export const updateFaq = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const { question, answer, status } = req.body;
    const updateFaq = await Faqs.findOneAndUpdate(
      { _id: objectId },
      {
        $set: {
          question,
          answer,
          status,
        },
      },
      { new: true }
    );

    if (updateFaq) {
      return res.send({ message: "Faq updated.", faqs: updateFaq });
    } else {
      return res.send({ error: "Faq not found." });
    }
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error!" });
  }
};

export const deleteFaq = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const faqs = await Faqs.findOne({ uniqueId: uniqueId });
    if (faqs) {
      await Faqs.findOneAndDelete({ uniqueId: uniqueId })
        .then((result) => {
          return res.send({ message: "Deleted." });
        })
        .catch((err) => {
          console.log(err.message);
          return res.send({ error: "Internal Server Error!" });
        });
    } else {
      return res.send({ error: "Faq not found!" });
    }
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error!" });
  }
};
