const loginUser = require("../models/loginUser");
const bycrypt = require("bcryptjs");

module.exports.registerUser = async (req, res, next) => {
  const args = {
    email: req.body.email,
    password: bycrypt.hashSync(req.body.password, 8),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  try {
    const { outBinds } = await loginUser.register(args);
    const { user_token } = outBinds;

    res
      .status(200)
      .cookie("auth_token", user_token[0], {
        sameSite: "none",
        secure: true,
        expires: new Date(2147483647 * 1000),
      })
      .json({
        message: "User registered successfully!",
        data: [
          {
            user_token: user_token[0],
            email: args.email,
            firstname: args.firstname,
            lastname: args.lastname,
          },
        ],
      });
  } catch (error) {
    res
      .status(400)
      .clearCookie("auth_token", { sameSite: "none", secure: true })
      .json({
        message: "User registration failed!",
      });
  }
};

module.exports.loginUser = async (req, res, next) => {
  let args = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const { rows: hashpasswordrow } = await loginUser.hashpassword(args);
    if (hashpasswordrow.length > 0) {
      const hashpassword = hashpasswordrow[0].PASSWORD;
      if (bycrypt.compareSync(args.password, hashpassword)) {
        args = { email: args.email, password: hashpassword };
        const { outBinds } = await loginUser.login(args);
        const { user_token, firstname, lastname } = outBinds;
        return res
          .status(200)
          .cookie("auth_token", user_token[0], {
            sameSite: "none",
            secure: true,
            expires: new Date(2147483647 * 1000),
          })
          .json({
            message: "User logged in successfully!",
            data: [
              {
                user_token: user_token[0],
                email: args.email,
                firstname: firstname[0],
                lastname: lastname[0],
              },
            ],
          });
      }
    }

    res
      .status(403)
      .clearCookie("auth_token", { sameSite: "none", secure: true })
      .json({
        message: "User login failed!, invalid credentials!",
      });
  } catch (error) {
    res
      .status(400)
      .clearCookie("auth_token", { sameSite: "none", secure: true })
      .json({
        message: error.message,
      });
  }
};
