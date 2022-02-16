const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  signToken: function ({ email, username, _id, roles }) {
    const payload = { email, username, _id, roles };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
