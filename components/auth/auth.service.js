const bcrypt = require('bcrypt');
const jose = require('jose');

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const ALGORITHM = 'HS256';
const EXPIRATION_TIME = '2h';

class AuthService {
  constructor() {}

  login = async (user, password) => {
    const match = await bcrypt.compare(password, user.password);
    if (match === false) return { isValid: false, jwt: null };
    const jwt = await new jose.SignJWT({
      user: { id: user.id, email: user.email },
    })
        .setProtectedHeader({ alg: ALGORITHM })
        .setIssuedAt()
        .setExpirationTime(EXPIRATION_TIME)
        .sign(SECRET);
    return { isValid: match, jwt };
  };

  verifyToken = async (jwt) => {
    try {
      const { payload } = await jose.jwtVerify(jwt, SECRET);
      return { isValid: true, payload };
    } catch (error) {
      return { isValid: false, payload: null };
    }
  };
}

module.exports = AuthService;
