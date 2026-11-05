const express = require("express");
const Product = require("../models/productModel");
const upload = require("../fileupload/uploadMiddleware");

const router = express.Router();

router.post(
  "/add_product",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  (req, res) => {
    console.log(req.body);

    console.log(Date.now());

    console.log("files", req.files);

    console.log("image file", req.files["image"]);

    console.log("gallery files", req.files["gallery"]);

    const { product_name, price, description } = req.body;

    const image = req.files["image"][0].path;

    const gallerypath = [];

    for (let i = 0; i < req.files["gallery"].length; i++) {
      gallerypath.push(req.files["gallery"][i].path);
    }

    console.log(gallerypath);

    const product = new Product({
      name: product_name,
      price,
      description,
      image,
      gallery: gallerypath,
    });

    product
      .save()
      .then(() => {
        res.send("product added successfully");
      })
      .catch((er) => {
        console.log(er);
      });
  },
);

router.get("/all_products", (req, res) => {
  Product.find()
    .then((products) => {
      res.send(products);
    })
    .catch((er) => {
      console.log(er);
    });
});

router.get("/get/product/byname/:product_name/:price", (req, res) => {
  const { price, product_name } = req.params;

  Product.findOne({ name: product_name, price })
    .then((product) => {
      console.log(product);
      res.send(product);
    })
    .catch((er) => {
      console.log(er);
    });
});

router.post("/delete", (req, res) => {
  Product.findByIdAndDelete(req.body.prod_id)
    .then(() => {
      res.send("product deleted successfully");
    })
    .catch((er) => {
      console.log(er);
    });
});

router.get("/getproduct/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      console.log(product);
      res.send(product);
    })
    .catch((er) => {
      console.log(er);
    });
});

module.exports = router;
