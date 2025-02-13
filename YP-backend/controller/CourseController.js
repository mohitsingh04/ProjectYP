import Course from "../models/Courses.js";

export const getCourse = async (req, res) => {
  try {
    const course = await Course.find();
    return res.status(200).json(course);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error!" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const course = await Course.findOne({ uniqueId: uniqueId });
    return res.status(200).json(course);
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error!" });
  }
};

export const addCourse = async (req, res) => {
  try {
    const {
      property_id,
      property_name,
      userId,
      course_name,
      course_short_name,
      course_level,
      course_type,
      price,
      duration,
      description,
    } = req.body;

    const course_image = req?.files["image"]?.[0]?.path;
    const course_original_image = req?.files["image"]?.[0]?.originalPath;
    const courseSlug = course_name?.replace(/ /g, "-").toLowerCase();
    const kebabCase = property_name?.replace(/ /g, "-").toLowerCase();
    const course = await Course.findOne().sort({ _id: -1 }).limit(1);
    const existCourse = await Course.findOne({ course_name: course_name });
    if (!existCourse) {
      const x = course ? course.uniqueId + 1 : 1;
      const newCourse = new Course({
        userId,
        uniqueId: x,
        property_id,
        property_name: kebabCase,
        course_name,
        course_short_name,
        course_type,
        course_level,
        price,
        image: [course_image, course_original_image],
        duration,
        description,
        course_slug: courseSlug,
      });
      if (await newCourse.save()) {
        res.send({ message: "Course added." });
      }
    } else {
      return res.send({ error: "This course is already exist." });
    }
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal Server Error!" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const {
      course_name,
      course_short_name,
      course_type,
      price,
      course_level,
      duration,
      description,
      status,
    } = req.body;
    const course = await Course.findOne({ uniqueId: uniqueId });

    const imageFile = req.files["image"];
    let existImage = imageFile ? req?.files["image"][0]?.path : course.image[0];
    const existImageOriginal = imageFile
      ? req.files["image"][0]?.originalPath
      : course.image[1];

    if (!course) {
      return res.send({ error: "Course not found!" });
    } else {
      await Course.findOneAndUpdate(
        { uniqueId: uniqueId },
        {
          $set: {
            course_name,
            course_short_name,
            course_type,
            price,
            image: [existImage, existImageOriginal],
            duration,
            course_level,
            description,
            status,
          },
        }
      )
        .then((result) => {
          return res.send({ message: "Course updated." });
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

export const deleteCourse = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const course = await Course.findOne({ uniqueId: uniqueId });
    if (course) {
      await Course.findOneAndDelete({ uniqueId: uniqueId })
        .then((result) => {
          return res.send({ message: "Course Deleted." });
        })
        .catch((err) => {
          console.log(err.message);
          return res.send({ error: "Internal Server Error." });
        });
    } else {
      return res.send({ error: "Course not found!" });
    }
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "Internal server error!" });
  }
};
