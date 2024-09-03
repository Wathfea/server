const HomeController = require('./home.controller');
const HomeRouter = require('./home.router');

const homeController = new HomeController();
const homeRouter = new HomeRouter(homeController);

export default {
    router: homeRouter.router,
};

