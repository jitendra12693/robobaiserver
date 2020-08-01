const db = require("../models");
const Product = db.products;

exports.findAll  = (req, res) => {
const name = req.query.Name;
var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

Product.find(condition)
.then(data => data ? res.json(data) : res.sendStatus(404))
.catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving products."
        });
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.Name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  Product.countDocuments({}, function(error, numOfDocs){
    if(error)
      return callback(error);
    else{
      //  Create Product Object
      const product = new Product({
        Name: req.body.Name,
        CostPrice: req.body.CostPrice,
        SellingPrice:req.body.SellingPrice,
        Quantity: req.body.Quantity,
        ProductImage: req.body.ProductImage,
        ProductId: numOfDocs+1 
      });
      // Save product in the database
      product
      .save(product)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product."
        });
      });
    }  
    //callback(null, numOfDocs);
  });

    
    
  
    
    
};

exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Product with id=${id}. Maybe Product was not found!`
          });
        } else res.send({ message: "Product was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Product with id=" + id
        });
    });
};

exports.recordCount =(req,res)=>{
Product.countDocuments()
.then(data => data ? res.json(data) : res.sendStatus(404))
.catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving products."
        });
    });
};