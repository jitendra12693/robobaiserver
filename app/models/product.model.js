
  module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        Name: String,
        CostPrice: Number,
        SellingPrice: Number,
        Quantity:Number,
        ProductId:Number,
        ProductImage:String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Product = mongoose.model("products", schema);
    return Product;
  };