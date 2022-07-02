const userInfo = require("../models/userInfo");

module.exports.userInfo = async (req, res, next) => {
  const person_token = req.headers.authorization.split("Bearer ")[1];
  try {
    const args = { user_token: person_token };
    const { rows } = await userInfo.userInfo(args);
    res.status(200).json({
      message: "Types accounts retrieved successfully!",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "User info failed!",
    });
  }
};

/*module.exports.infoPerson = (req, res, next) => {
  res.status(200).json({
    message: "success",
    data: [
      {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
      },
    ],
  });
};*/
