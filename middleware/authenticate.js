const jwt = require("jsonwebtoken");
const secretKey = "987456321";
function authentication(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[0];
  if (!token) {
    return res.status(401).json({ error: "Access token not provided" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = user;
    next();
  });
}

module.exports = authentication;
