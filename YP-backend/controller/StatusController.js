import Status from "../models/status.js";

export const getStatus = async (req, res) => {
  try {
    let status = await Status.find();
    return res.status(200).json(status);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error" });
  }
};

export const addStatus = async (req, res) => {
  try {
    const { status_name, status_color, description } = req.body;
    const status = await Status.findOne().sort({ _id: -1 }).limit(1);
    const existStatus = await Status.findOne({ name: status_name });
    if (!existStatus) {
      const x = status ? status.uniqueId + 1 : 1;
      const newStatus = new Status({
        uniqueId: x,
        name: status_name,
        color: status_color,
        description: description,
      });
      if (await newStatus.save()) {
        res.send({ message: "Status added." });
      }
    } else {
      return res.send({ error: "This status is already exist." });
    }
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const { status_name, status_color, description } = req.body;

    const updatedStatus = await Status.findOneAndUpdate(
      { _id: objectId },
      {
        $set: {
          name: status_name,
          color: status_color,
          description: description,
        },
      },
      { new: true }
    );

    if (updatedStatus) {
      return res.send({ message: "Status updated.", status: updatedStatus });
    } else {
      return res.send({ error: "Status not found." });
    }
  } catch (err) {
    console.error(err.message);
    return res.send({ error: "Internal Server Error" });
  }
};

export const deleteStatus = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    await Status.findOneAndDelete({ _id: objectId });
    return res.send({ message: "Status deleted." });
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error" });
  }
};

export const getStatusById = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const status = await Status.findOne({ _id: objectId });
    return res.status(200).json(status);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error" });
  }
};
