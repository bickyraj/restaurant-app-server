const express = require('express');
const Router = express.Router();
const CategoryService = require('../services/CategoryService');

const categoryService = new CategoryService;

Router.get('/all', async (request, response) => {
  try {
    const categories = await categoryService.getAllSubCategories();
    return response.status(200).json({
      "data": categories
    });

  } catch (error) {
    return response.status(500).json({
      "error": error.message
    });
  }
});

Router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const category = await categoryService.findById(id);
    return response.status(200).json({
      "data": category
    });

  } catch (error) {
    return response.status(500).json({
      "error": error.message
    });
  }
});

Router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const category = await categoryService.update(id, request.body);
    return response.status(200).json({
      "data": category
    });

  } catch (error) {
    return response.status(500).json({
      "error": error.message
    });
  }
});

Router.post('/', async (request, response) => {
  try {
    const category = await categoryService.createSubCategory(request.body);
    return response.status(200).json({
      "data": category
    });

  } catch (error) {
    return response.status(500).json({
      "error": error.message
    });
  }
});

Router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const category = await categoryService.delete(id);
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
    const category = await categoryService.getCategoryBySlug(slug);
    if (!category) {
      throw new Error("category not found");
    }
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