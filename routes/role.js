const express = require('express');
const Router = express.Router();
const RoleModel = require('../models/role');

Router.post('/create', async (request, response) => {
  const { name } = request.body;
  const role = new RoleModel({
    name
  });
  try {
    await role.save();
    return response.status(200).json({
      "role": role
    });

  } catch (error) {
    return response.status(500).json({
      "error": error.message
    });
  }

});

module.exports = Router;