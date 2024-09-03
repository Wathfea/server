const express = require('express');

class HomeRouter {
    constructor(homeController) {
        this.homeController = homeController;
    }

    get router() {
        const router = express.Router();
        router.route('/').get(this.homeController.getHome);

        return router;
    }
}

export default HomeRouter;
