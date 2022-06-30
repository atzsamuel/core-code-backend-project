const express = require("express");
const { server } = require("./src/config/config");
const oracle = require("./src/utils/oracle");
const app = express();
//const cors = require("cors");

const userRoutes = require("./src/routes/loginUser");
const bankRoutes = require("./src/routes/bankAccount");


//app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// api routes
app.use(userRoutes);
app.use(bankRoutes);


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
