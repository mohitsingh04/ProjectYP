import PropertyCourse from "../models/PropertyCourse.js";

export const getPropertyCourse = async (req, res) => {
  try {
    const propertyCourse = await PropertyCourse.find();
    return res.status(200).json(propertyCourse);
  } catch (err) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const getPropertyCourseById = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const propertyCourse = await PropertyCourse.findOne({ _id: objectId });
    return res.status(200).json(propertyCourse);
  } catch (err) {
    return res.send({ error: "Internal Server Error" });
  }
};
export const getPropertyCourseByUniqueId = async (req, res) => {
  try {
    const uniqueId = req.params.uniqueId;
    const propertyCourse = await PropertyCourse.findOne({ uniqueId: uniqueId });
    return res.status(200).json(propertyCourse);
  } catch (err) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const getPropertyCourseByPropertyId = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const propertyCourse = await PropertyCourse.find({
      property_id: propertyId,
    });
    return res.status(200).json(propertyCourse);
  } catch (err) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const updatePropertyCourse = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const {
      course_name,
      course_type,
      course_short_name,
      price,
      course_level,
      duration,
      description,
      price_rupee,
    } = req.body;

    const existCourse = await PropertyCourse.findOne({
      course_name: course_name,
    });

    if (!existCourse) {
      return res.status(400).send({ error: "Course not found!" });
    }

    await PropertyCourse.findOneAndUpdate(
      { _id: objectId },
      {
        $set: {
          course_type,
          course_short_name,
          price,
          course_level,
          duration,
          description,
          price_rupee,
        },
      }
    ).then((result) => {
      return res.status(200).send({ message: "Course updated." });
    });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

export const addPropertyCourse = async (req, res) => {
  try {
    const {
      image,
      userId,
      course_name,
      course_type,
      course_short_name,
      price,
      course_level,
      duration,
      course_id,
      property_id,
      description,
      property_name,
      price_rupee,
    } = req.body;

    const kebabCase = property_name?.replace(/ /g, "-").toLowerCase();

    const course = await PropertyCourse.findOne().sort({ _id: -1 }).limit(1);
    const existCourse = await PropertyCourse.findOne({
      property_id,
      course_name,
    });
    if (!existCourse) {
      const x = course ? course.uniqueId + 1 : 1;

      const newCourse = PropertyCourse({
        image,
        userId,
        uniqueId: x,
        course_name,
        course_type,
        course_short_name,
        price: price,
        course_level,
        duration,
        course_id,
        property_id,
        description,
        price_rupee: price_rupee,
        property_name: kebabCase,
      });
      if (await newCourse.save()) {
        res.status(200).send({ message: "Course added." });
      }
    } else {
      return res.status(400).send({ error: "This course is already exist." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletePropertyCourse = async (req, res) => {
  try {
    const { objectId } = req.params;

    const delCourse = await PropertyCourse.findOneAndDelete({
      _id: objectId,
    });

    if (delCourse) {
      return res
        .status(200)
        .json({ message: "Property Course Deleted Successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
