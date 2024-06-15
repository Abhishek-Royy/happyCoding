require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const router = require("./router/auth-router");
const connectDatabase = require("./database/db");
const adminRoute = require("./router/admin-router");
const errorMiddleware = require("./middleware/error.middleware");

// USE MIDDLEWARE

var corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json()); //to convert all thedata into json format
app.use("/api/v1", router); //define a path

app.use("/api/admin", adminRoute);

//  Call the error middleware
app.use(errorMiddleware);

/********************************************** */
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server run at: http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log("Error in database & server");
  });
