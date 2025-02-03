import State from "../models/States.js";

export const getState = async (req, res) => {
    try {
        const state = await State.find();
        return res.status(200).json(state);
    } catch (err) {
        console.log(err.message)
        return res.send({ error: "Internal Server Error." })
    }
};