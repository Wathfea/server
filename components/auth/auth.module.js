const AuthController = require('./auth.controller.js');
const AuthService = require('./auth.service.js');
const AuthRouter = require('./auth.router.js');
const UserService = require('../user/user.service.js');

const userService = new UserService();
const authService = new AuthService();
const authController = new AuthController(authService, userService);
const authRouter = new AuthRouter(authController);

module.exports = {
  router: authRouter.router,
};
