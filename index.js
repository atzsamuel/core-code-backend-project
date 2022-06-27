const express = require("express");
const { server } = require("./src/config/config");
const oracle = require("./src/utils/oracle");
const app = express();

app.use(express.json());

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
