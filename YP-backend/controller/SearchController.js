import Search from "../models/Search.js";

export const getSearch = async (req, res) => {
  try {
    const search = await Search.find();
    return res.status(200).json(search);
  } catch (error) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const addSearch = async (req, res) => {
  try {
    const { search } = req.body;
    const x = search ? search.uniqueId + 1 : 1;
    const newSearch = new Search({
      uniqueId: x,
      search: search,
    });
    // await newSearch.save();
    // res.status(201).json(newSearch);
  } catch (err) {
    return res.send({ error: "Internal Server Error!" });
  }
};
