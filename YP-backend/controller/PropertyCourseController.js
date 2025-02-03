import PropertyCourse from "../models/PropertyCourse.js";

export const getPropertyCourse = async (req, res) => {
    try {
        const propertyCourse = await PropertyCourse.find();
        return res.status(200).json(propertyCourse);
    } catch (err) {
        res.send({ error: "Internal Server Error!" })
        console.log(err.message)
    }
};

export const getPropertyCourseById = async (req, res) => {
    try {
        const uniqueId = req.params.uniqueId;
        const propertyCourse = await PropertyCourse.findOne({ uniqueId: uniqueId });
        return res.status(200).json(propertyCourse);
    } catch (err) {
        res.send({ error: "Internal Server Error!" })
        console.log(err.message)
    }
};

export const addPropertyCourse = async (req, res) => {
    try {
        const { userId, property_id, property_name, course_id, course_name, duration, course_type, price } = req.body;
        const courseSlug = course_name?.replace(/ /g, "-").toLowerCase();
        const kebabCase = property_name?.replace(/ /g, "-").toLowerCase();
        const course = await PropertyCourse.findOne().sort({ _id: -1 }).limit(1);
        const existCourse = await PropertyCourse.findOne({ course_name: course_name, property_id: property_id });
        if (!existCourse) {
            const x = course ? course.uniqueId + 1 : 1;
            const newCourse = new PropertyCourse({
                userId,
                uniqueId: x,
                property_id,
                property_name: kebabCase,
                course_name,
                course_type,
                price,
                duration,
                course_slug: courseSlug
            });
            if (await newCourse.save()) {
                res.send({ message: "Course added." });
            }
        } else {
            return res.send({ error: "This course is already exist." });
        }
    } catch (err) {
        res.send({ error: "Internal Server Error!" })
        console.log(err.message)
    }
};

export const updatePropertyCourse = async (req, res) => {
    try {
        const uniqueId = req.params.uniqueId;
        const { course_name, duration, course_type, price } = req.body;
        const courseSlug = course_name?.replace(/ /g, "-").toLowerCase();
        const existCourse = await PropertyCourse.findOne({ course_name: course_name });
        // if (!existCourse) {
        //     return res.send({ error: "Course not found!" })
        // } else {

        // }
        await PropertyCourse.findOneAndUpdate({ uniqueId: uniqueId }, {
            $set: {
                course_name,
                course_type,
                price,
                duration,
                course_slug: courseSlug
            }
        })
            .then(result => {
                return res.send({ message: "Course updated." });
            })
            .catch(err => {
                console.log(err.message)
                return res.send({ error: "Internal Server Error." });
            });
    } catch (err) {
        console.log(err.message)
        return res.send({ error: "Internal server error!" })
    }
}