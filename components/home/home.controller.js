class HomeController {
    getHome = async (_, res) => {
        try {
            return res.status(200).send('Welcome to the Pullit API');
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                return res.status(500).json({
                    error: 'Internal Server Error',
                    'msg': error.message,
                    'stack': error.stack
                });
            } else {
                return res.status(500).json({error: 'Internal Server Error'});
            }
        }
    };

}

export default HomeController;
