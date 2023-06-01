const userRouter = require("./user");
const productRouter = require("./product");
const { notFount, errHadler } = require("../middlewares/errHandler");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);

  app.use(notFount);
  app.use(errHadler);
};

module.exports = initRoutes;
