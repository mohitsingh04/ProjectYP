import { CategoryImageMover } from "../helper/FolderCleaners/PropertyImageMover.js";
import Category from "../models/Category.js";

export const getCategory = async (req, res) => {
  try {
    let category = await Category.find();
    return res.status(200).json(category);
  } catch (err) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const category = await Category.findOne({ _id: objectId });
    return res.status(200).json(category);
  } catch (err) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { userId, category_name, parent_category, category_description } =
      req.body;
    let category_icon = req?.files["category_icon"]?.[0]?.path;
    let category_original_icon = req?.files["category_icon"]?.[0]?.originalPath;
    let featured_image = req?.files["featured_image"]?.[0]?.path;
    let featured_original_image =
      req?.files["featured_image"]?.[0]?.originalPath;

    const category = await Category.findOne().sort({ _id: -1 }).limit(1);
    const existCategory = await Category.findOne({
      category_name: category_name,
    });
    if (!existCategory) {
      const x = category ? category.uniqueId + 1 : 1;
      const newCategory = new Category({
        uniqueId: x,
        userId,
        category_name,
        parent_category,
        category_icon: [category_icon, category_original_icon],
        featured_image: [featured_image, featured_original_image],
        description: category_description,
      });
      if (await newCategory.save()) {
        await CategoryImageMover();
        return res.send({ message: "Category added." });
      }
    } else {
      return res.send({ error: "This category is already exist." });
    }
  } catch (err) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const {
      userId,
      category_name,
      parent_category,
      category_description,
      status,
    } = req.body;

    const category = await Category.findOne({ category_name: category_name });

    const iconFile = req.files["category_icon"];
    const category_icon = iconFile
      ? req?.files["category_icon"][0]?.path
      : category.category_icon[0];

    const category_original_icon = iconFile
      ? req?.files["category_icon"][0]?.originalPath
      : category.category_icon[1];

    const featuredFile = req.files["featured_image"];
    const featured_image = featuredFile
      ? req?.files["featured_image"][0]?.path
      : category.featured_image[0];

    const featured_original_image = featuredFile
      ? req?.files["featured_image"][0]?.originalPath
      : category.featured_image[1];

    if (!category) {
      return res.send({ error: "Category not found." });
    }
    await Category.findOneAndUpdate(
      { _id: objectId },
      {
        $set: {
          userId,
          category_name,
          parent_category,
          category_icon: [category_icon, category_original_icon],
          featured_image: [featured_image, featured_original_image],
          description: category_description,
          status: status,
        },
      }
    )
      .then(async (result) => {
        await CategoryImageMover();
        return res.send({ message: "Category updated." });
      })
      .catch((err) => {
        return res.send({ error: "Internal Server Error." });
      });
  } catch (err) {
    return res.send({ error: "Internal Server Error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const category = await Category.findOne({ _id: objectId });
    if (category) {
      await Category.findOneAndDelete({ _id: objectId })
        .then(async (result) => {
          await CategoryImageMover();
          return res.send({ message: "Category Deleted." });
        })
        .catch((err) => {
          return res.send({ error: "Internal Server Error." });
        });
    } else {
      return res.send({ error: "Category not found." });
    }
  } catch (err) {
    return res.send({ error: "Internal Server Error" });
  }
};
