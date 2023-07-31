const express = require('express');
const Router = express.Router();
const CategoryModel = require('../models/category');
const CategoryService = require('../services/CategoryService');

const categoryService = new CategoryService;

Router.get('/', async (request, response) => {
  try {
    const categories = await categoryService.getCategories();
    return response.status(200).json({
      "categories": categories
    });

  } catch (error) {
    return response.status(500).json({
      "error": error.message
    });
  }

});

Router.post('/create', async (request, response) => {
  try {
    const category = await categoryService.createRootCategory(request.body);
    return response.status(200).json({
      "category": category
    });

  } catch (error) {
    return response.status(500).json({
      "error": error.message
    });
  }

});

Router.post('/sub-category', async (request, response) => {
  try {
    const category = await categoryService.createSubCategory(request.body);
    return response.status(200).json({
      "category": category
    });

  } catch (error) {
    return response.status(500).json({
      "error": error.message
    });
  }

});

Router.get('/:slug', async (request, response) => {
  try {
    const { slug } = request.params;
    console.log(slug);
    const category = await categoryService.getCategoryBySlug(slug);
    return response.status(200).json({
      "category": category
    });

  } catch (error) {
    return response.status(500).json({
      "error": error.message
    });
  }

});

module.exports = Router;