const express = require("express");
const path = require('path');
const userRouter = require("./routers/userRouter");
const productRouter = require('./routers/productRouter')
const cartRouter = require('./routers/cartRouter')
const shopRouter = require('./routers/shopRouter')
const authRouter = require("./routers/authRouter");
const uploadRouter = require("./routers/uploadRouter");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const connectDB = require("./db");
const app = express();
const port = 5000;

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use("/api",authRouter, userRouter, productRouter, uploadRouter, shopRouter, cartRouter);

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
