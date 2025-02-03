import Search from "../models/Search.js";

export const getSearch = async (req, res) => {
    try {
        const search = await Search.find();
        return res.status(200).json(search);
    } catch (error) {
        console.log(error.message)
        return res.send({ error: "Internal server error!" })
    }
};

export const addSearch = async (req, res) => {
    try {
        const { search } = req.body;
        const x = search ? search.uniqueId + 1 : 1;
        const newSearch = new Search({
            uniqueId: x,
            search: search,
        })
        console.log(newSearch)
        // await newSearch.save();
        // res.status(201).json(newSearch);
    } catch (err) {
        console.log(err.message)
        return res.send({ error: "Internal Server Error!" })
    }
}