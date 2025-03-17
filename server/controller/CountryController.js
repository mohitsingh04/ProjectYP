import Country from "../models/Country.js";

export const getCountry = async (req, res) => {
  try {
    const country = await Country.find();
    return res.status(200).json(country);
  } catch (err) {
    return res.send({ error: "Internal Server Error." });
  }
};
