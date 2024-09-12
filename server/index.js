const express = require("express");
const userRouter = require("./routers/userRouter");
const productRouter = require('./routers/productRouter')
const cartRouter = require('./routers/cartRouter')
const shopRouter = require('./routers/shopRouter')
const auth = require("./routers/auth");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const connectDB = require("./db");
const app = express();
const port = 5500;

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api",auth, userRouter, productRouter, shopRouter, cartRouter);

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
