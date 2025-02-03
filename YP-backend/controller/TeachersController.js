import Teachers from "../models/Teachers.js";

export const getTeacher = async (req, res) => {
  try {
    const teachers = await Teachers.find();
    return res.status(200).json(teachers);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal server error!" });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const teachers = await Teachers.findOne({ uniqueId: uniqueId });
    return res.status(200).json(teachers);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal server error!" });
  }
};

export const addTeacher = async (req, res) => {
  try {
    const {
      userId,
      teacher_name,
      designation,
      experience,
      property_id,
      property_name,
    } = req.body;
    const slug = teacher_name.replace(/ /g, "-").toLowerCase();
    const kebabCase = property_name.replace(/ /g, "-").toLowerCase();
    const profile = req?.files["profile"]?.[0]?.filename;
    const teachers = await Teachers.findOne().sort({ _id: -1 }).limit(1);
    // const existTeachers = await Teachers.findOne({ teacher_name: teacher_name });
    // if (!existTeachers) {
    const x = teachers ? teachers.uniqueId + 1 : 1;
    const newTeacher = new Teachers({
      userId,
      uniqueId: x,
      teacher_name,
      profile,
      designation,
      experience,
      property_id,
      property_name: kebabCase,
      teacherSlug: slug,
    });
    if (await newTeacher.save()) {
      return res.send({ message: "Teacher added." });
    }
    // }
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal server error!" });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const { teacher_name, designation, experience, status } = req.body;
    const profileFile = req.files["profile"];
    const teacherProfile = profileFile
      ? req?.files["profile"][0]?.filename
      : req.body.profile;
    const teacher = await Teachers.findOne({ uniqueId: uniqueId });
    if (!teacher) {
      return res.send({ error: "Teacher not found!" });
    } else {
      await Teachers.findOneAndUpdate(
        { uniqueId: uniqueId },
        {
          $set: {
            teacher_name,
            designation,
            experience,
            profile: teacherProfile,
            status,
          },
        }
      )
        .then((result) => {
          return res.send({ message: "Teacher updated." });
        })
        .catch((err) => {
          console.log(err.message);
          return res.send({ error: "Internal Server Error." });
        });
    }
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal server error!" });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const teacher = await Teachers.findOne({ uniqueId: uniqueId });
    if (teacher) {
      await Teachers.findOneAndDelete({ uniqueId: uniqueId })
        .then((result) => {
          return res.send({ message: "Teacher Deleted." });
        })
        .catch((err) => {
          console.log(err.message);
          return res.send({ error: "Internal Server Error." });
        });
    } else {
      return res.send({ error: "Teacher not found!" });
    }
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal server error!" });
  }
};
