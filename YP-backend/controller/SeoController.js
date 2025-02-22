import Seo from "../models/Seo.js";

export const getSeo = async (req, res) => {
  try {
    const seo = await Seo.find();
    return res.status(200).json(seo);
  } catch (error) {
    console.log(error.message);
    return res.send({ error: "Internal server error!" });
  }
};

export const getSeoById = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const seo = await Seo.findOne({ _id: objectId });
    return res.status(200).json(seo);
  } catch (error) {
    console.log(error.message);
    return res.send({ error: "Internal server error!" });
  }
};

export const addSeo = async (req, res) => {
  try {
    const {
      title,
      slug,
      meta_tags,
      description,
      primary_focus_keyword,
      json_schema,
      course_id,
      course_name,
      property_id,
      property_name,
    } = req.body;
    const seoSlug = title?.replace(/ /g, "-")?.toLowerCase();
    const courseKebabCase = course_name?.replace(/ /g, "-")?.toLowerCase();
    const propertyKebabCase = property_name?.replace(/ /g, "-")?.toLowerCase();

    const mainSlug = slug.toLowerCase().replace(/\s+/g, "-");

    const seo = await Seo.findOne().sort({ _id: -1 }).limit(1);
    const x = seo ? seo.uniqueId + 1 : 1;
    const existSeo = await Seo.findOne({
      title: title,
      property_id: property_id,
    });
    if (!existSeo) {
      const newSeo = new Seo({
        uniqueId: x,
        title,
        slug: mainSlug,
        meta_tags,
        description,
        primary_focus_keyword,
        json_schema,
        course_id,
        course_name: courseKebabCase,
        property_id,
        property_name: propertyKebabCase,
        seoSlug: seoSlug,
      });
      if (await newSeo.save()) {
        return res.send({ message: "Seo Added." });
      }
    } else {
      return res.send({ error: "This seo title is alredy exist!" });
    }
  } catch (error) {
    console.log(error.message);
    return res.send({ error: "Internal server error!" });
  }
};

export const updateSeo = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const {
      title,
      slug,
      meta_tags,
      description,
      primary_focus_keyword,
      json_schema,
      status,
    } = req.body;

    const existSeo = await Seo.findOne({ _id: objectId });

    const mainSlug = slug
      ? slug.toLowerCase().replace(/\s+/g, "-")
      : existSeo?.slug;

    await Seo.findOneAndUpdate(
      { _id: objectId },
      {
        $set: {
          title,
          slug: mainSlug,
          meta_tags,
          description,
          primary_focus_keyword,
          json_schema,
          status,
        },
      }
    )
      .then((result) => {
        return res.send({ message: "Seo updated." });
      })
      .catch((err) => {
        console.log(err.message);
        return res.send({ error: "Internal Server Error." });
      });
  } catch (error) {
    console.log(error.message);
    return res.send({ error: "Internal server error!" });
  }
};

export const deleteSeo = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const seo = await Seo.findOne({ _id: objectId });
    if (seo) {
      await Seo.findOneAndDelete({ _id: objectId })
        .then((result) => {
          console.log(result);
          return res.send({ message: "Seo Deleted." });
        })
        .catch((err) => {
          console.log(err.message);
          return res.send({ error: "Internal Server Error." });
        });
    } else {
      return res.send({ error: "Seo not found." });
    }
  } catch (error) {
    console.log(error.message);
    return res.send({ error: "Internal server error!" });
  }
};
