import Category from "../models/categoryModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({ message: "Name and image required" });
    }

    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const category = await Category.create({
      name,
      image: result.secure_url,
    });

    res.status(201).json({ success: true, category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      category.image = result.secure_url;
    }

    if (name) category.name = name;

    await category.save();
    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
