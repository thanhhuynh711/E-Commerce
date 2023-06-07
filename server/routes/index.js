const userRouter = require("./user");
const productRouter = require("./product");
const productCategoryRouter = require("./productCategory");
const blogCategoryRouter = require("./blogCatrgory");
const blog = require("./blog");
const brand = require("./brand");
const { notFount, errHadler } = require("../middlewares/errHandler");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/prodcategory", productCategoryRouter);
  app.use("/api/blogcategory", blogCategoryRouter);
  app.use("/api/blog", blog);
  app.use("/api/brand", brand);

  app.use(notFount);
  app.use(errHadler);
};

module.exports = initRoutes;
