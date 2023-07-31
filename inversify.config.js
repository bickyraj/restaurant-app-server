const { Container } = require('inversify');
const UserService = require('./services/UserService');

const container = new Container();
container.bind('UserService').to(UserService);

module.exports = container;