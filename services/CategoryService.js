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
      const category = new Category({ name });
      return await category.save();
    } catch (error) {
      throw error;
    }
  }

  async createSubCategory(postData) {
    try {
      const { name, root_category_id, price = null } = postData;
      const sub_category = new Category({ name, parentCategory: root_category_id, price });
      return await sub_category.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CategoryService;