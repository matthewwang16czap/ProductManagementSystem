const express = require("express");
const userRouter = require("./routers/userRouter");
const employeeRouter = require("./routers/employee");
const auth = require("./routers/auth");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const connectDB = require("./db");
const app = express();
const port = 5500;

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", userRouter);

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
