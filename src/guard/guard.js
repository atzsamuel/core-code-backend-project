const Guard = require("../models/guard");

const guard = async (req, res, next) => {
  //console.log(req.headers);
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      message: "Unauthorized Invalid token",
    });
  }

  const user_token = req.headers.authorization.split("Bearer ")[1];
 // console.log("userToken", user_token);
  try {
    const args = { user_token };
    const { rows } = await Guard.verifyUserToken(args);
    if (rows.length === 0) {
      return res.status(401).json({
        message: "Unauthorized Invalid token",
      });
    }
  } catch (error) {
    console.log(error);
  }

  next();

  /*return res.status(401).json({
    message: "Unauthorized Invalid token",
  });*/
};

module.exports = guard;
