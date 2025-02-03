import BusinessHour from "../models/BusinessHour.js";

export const getBusinessHours = async (req, res) => {
    try {
        const businessHours = await BusinessHour.find();
        return res.status(200).json(businessHours);
    } catch (err) {
        console.log(err.message)
        return res.send({ error: "Internal Server Error" })
    }
};

export const addBusinessHours = async (req, res) => {
    try {
        const businessHours = new BusinessHour(req.body);
        await businessHours.save();
        res.status(201).json(businessHours);

    } catch (err) {
        console.log(err.message)
        return res.send({ error: "Internal Server Error" })
    }
};