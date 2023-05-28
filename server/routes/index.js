const userRouter = require("./user");
const { notFount, errHadler } = require("../middlewares/errHandler");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);

  app.use(notFount);
  app.use(errHadler);
};

module.exports = initRoutes;
