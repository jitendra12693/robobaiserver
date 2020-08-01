module.exports = app => {
    const products = require("../controllers/product.controller");
  
    var router = require("express").Router();
    
    router.post("/", products.create);
    router.get("/", products.findAll);
    router.put("/:id", products.update);
    router.get("/counts",products.recordCount)

    app.use('/api/products', router);
  };