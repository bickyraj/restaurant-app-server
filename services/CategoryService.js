const Category = require('../models/category');

class CategoryService {
  constructor() { }

  async getCategories(postData) {
    try {
      
      return await Category.find({ parentCategory: null });
    } catch (error) {
      throw error;
    }
  }
  
  async createRootCategory(postData) {
    try {
      const { name } = postData;
      const slug = name.replace(/[^a-zA-Z0-9]+/g, ' ').toLowerCase().replace(/ /g, '-');
      const category = new Category({ name, slug });
      return await category.save();
    } catch (error) {
      throw error;
    }
  }

  async createSubCategory(postData) {
    try {
      const { name, root_category_id, price = null } = postData;
      const slug = name.replace(/[^a-zA-Z0-9]+/g, ' ').toLowerCase().replace(/ /g, '-');
      const sub_category = new Category({ name, parentCategory: root_category_id, price, slug });
      return await sub_category.save();
    } catch (error) {
      throw error;
    }
  }

  async getCategoryBySlug(slug) {
    try {
      return await Category.findOne({
        slug: slug
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CategoryService;