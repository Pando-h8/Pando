const express = require("express");
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 3001;
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is started on port ${port}`));

module.exports = { app };
