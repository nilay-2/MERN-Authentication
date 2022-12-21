const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const clientDetailRouter = require("./routes/ClientDetailRouter");
const globalErrHandler = require("./utils/globalErrHandler");
dotenv.config({ path: "./config.env" });
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
mongoose.connect(process.env.DATABASE_URI).then(() => {
  console.log("Database connected successfully");
});

app.use("/users", userRoute);
app.use("/", clientDetailRouter);
app.use(globalErrHandler);
const port = process.env.PORT || 5000;
app.listen(port, "127.0.0.1", () => {
  console.log(`App running on port ${process.env.PORT}`);
});