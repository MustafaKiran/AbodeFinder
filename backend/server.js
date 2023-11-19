const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const connections = require("./connections");
const routes = require("./routes/routes");
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(express.json());
app.use(cors());

// routing

app.use("/", routes);
app.use("/", userRoutes);
app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
