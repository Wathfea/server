const UserController = require('./user.controller.js');
const UserService = require('./user.service.js');
const UserRouter = require('./user.router.js');
const AuthMiddleware = require('../auth/auth.middleware.js');
const AuthService = require('../auth/auth.service.js');

const userService = new UserService();
const authService = new AuthService();
const authMiddleware = new AuthMiddleware(authService);
const userController = new UserController(userService, authService);
const userRouter = new UserRouter(userController, authMiddleware);

module.exports = {
  router: userRouter.router,
};
