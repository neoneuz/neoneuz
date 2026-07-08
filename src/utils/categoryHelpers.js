import { categories } from "../data/categories";
import { subcategories } from "../data/subcategories";

export const getCategories = () => categories;

export const getSubcategories = (category) => {
  return subcategories[category] || [];
};