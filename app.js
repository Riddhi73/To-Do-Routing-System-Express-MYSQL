// Load dependencies
const express = require("express");
const routes = require("./routes");
const enviroment = require("./helpers/environment");
const { notFoundHandler } = require("./handlers/routes/notFoundHandler");
const db = require("./data/database");
const app = express();
// Middlewares
app.use(express.json());

// Routes
app.get("/sample", routes.sample);
app.post("/create", routes.create);
app.get("/read", routes.readAll);
app.get("/read/:id", routes.readSingle);
app.post("/insertcont", routes.insert);
app.put("/update/:id", routes.update);
app.delete("/delete/:id", routes.delete);

// 404 handler
app.use(notFoundHandler, (req, res) => {
  res.status(404);
});

// Start server
db.connectToDatbase().then(function () {
  app.listen(enviroment.port, () => {
    console.log(
      `Server is listening on port ${enviroment.port} in ${enviroment.envName} mode`
    );
  });
});
