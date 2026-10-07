const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  let token = req.cookies.token;
  
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts[0] === 'Bearer') token = parts[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};