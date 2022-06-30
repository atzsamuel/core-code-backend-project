const express = require("express");
const { server } = require("./src/config/config");
const oracle = require("./src/utils/oracle");
const app = express();
const cors = require("cors");
const cookies = require("cookie-parser");
const guard = require("./src/guard/guard");

const userRoutes = require("./src/routes/loginUser");
const bankRoutes = require("./src/routes/bankAccount");

const invalidRoutes = require("./src/routes/404");

app.use(cors({ origin: true, credentials: true }));
app.use(cookies());
app.use(express.json());

// user routes
app.use(userRoutes);

// Guard for verify user token
app.use(guard);

// api routes
app.use(bankRoutes);

// invalid endpoint handler
app.use(invalidRoutes);

oracle
  .start()
  .then(() => {
    console.log(`Oracle database started`);
    app.listen(server.port, () => {
      console.log(`Server is running on port: ${server.port}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
