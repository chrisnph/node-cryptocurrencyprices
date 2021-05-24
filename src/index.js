const { connect } = require("mongoose");
const cors = require("cors");

const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoURI = process.env.MONGODB_URL;

connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(async () => {
  console.log("connected to mongoDB");

  const APP_PORT = process.env.APP_PORT || 9001;
  app.listen(APP_PORT, () => {
    console.log("app listening on port", APP_PORT);

    // routes
    const routes = require("./routes");
    app.use(routes); // routes
  });

});
