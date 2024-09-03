class AuthController {
  constructor(authService, userService) {
    this.authService = authService;
    this.userService = userService;
  }

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.getUserByEmail(email);
      const { isValid, jwt } = await this.authService.login(user, password);
      if (isValid) {
        const userData = {
          email: user.email,
          name: user.name,
          isPayed: user.isPayed,
        };

        return res.status(200).send({ jwt: jwt, user: userData});
      }
      return res.status(401).send({ error: 'Invalid email or password' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default AuthController;
