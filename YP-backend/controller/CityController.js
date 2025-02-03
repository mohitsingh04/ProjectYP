import City from "../models/City.js";

export const getCity = async (req, res) => {
    try {
        const city = await City.find();
        return res.status(200).json(city);
    } catch (err) {
        console.log(err.message)
        return res.send({ error: "Internal Server Error." })
    }
};