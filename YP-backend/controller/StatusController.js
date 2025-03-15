import Status from "../models/status.js";

export const getStatus = async (req, res) => {
  try {
    let status = await Status.find();
    return res.status(200).json(status);
  } catch (err) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const addStatus = async (req, res) => {
  try {
    const { status_name, parent_status, description } = req.body;
    const status = await Status.findOne().sort({ _id: -1 }).limit(1);
    const existStatus = await Status.findOne({
      name: status_name,
      parent_status: parent_status,
    });
    if (!existStatus) {
      const x = status ? status.uniqueId + 1 : 1;
      const newStatus = new Status({
        uniqueId: x,
        name: status_name,
        parent_status: parent_status,
        description: description,
      });
      if (await newStatus.save()) {
        res.send({ message: "Status added." });
      }
    } else {
      return res.send({ error: "This status is already exist." });
    }
  } catch (err) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const { status_name, parent_status, description } = req.body;

    const existStatus = await Status.findOne({
      name: status_name,
      parent_status: parent_status,
    });
    if (existStatus) {
      return res.status(400).json({ error: "This status is already exist." });
    }

    const updatedStatus = await Status.findOneAndUpdate(
      { _id: objectId },
      {
        $set: {
          name: status_name,
          parent_status: parent_status,
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
    return res.send({ error: "Internal Server Error" });
  }
};

export const deleteStatus = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    await Status.findOneAndDelete({ _id: objectId });
    return res.send({ message: "Status deleted." });
  } catch (err) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const getStatusById = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const status = await Status.findOne({ _id: objectId });
    return res.status(200).json(status);
  } catch (err) {
    return res.send({ error: "Internal Server Error" });
  }
};
