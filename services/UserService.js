const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserService {
  constructor() { }

  async create(userData) {
    try {
      const { email, password, username } = userData;
      const hash = await bcrypt.hash(password, saltRounds);
      const role = await Role.findOne({ name: "admin" });
      const user = new User({ email, password: hash, username, active: 1, role: role._id });
      return await user.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;