const jwt = require("jsonwebtoken");

// Secret key to sign and verify tokens 
const secretKey = process.env.SECRET_KEY;


// Function to generate a JWT token based on user information
function generateToken(userId, username) {
  const payload = {
    userId,
    username,
  };

  const options = {
    expiresIn: "1h", // Token expiration time (1 hour in this example)
  };

  return jwt.sign(payload, secretKey, options);
}

// Function to verify a JWT token

const checkToken = async (req, res, next) => {
  const header = req.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    if (token == null) {
      res.status(401).send({ status: false });
    } else {
      jwt.verify(token, secretKey, function (err, validity) {
        if (!err) {
          next();
        } else {
          console.log(err);
          res.status(401).send({ status: false, authorization: "failed" });
        }
      });
    }
  } else {
    res.sendStatus(403);
  }
};

module.exports = { generateToken, checkToken };
