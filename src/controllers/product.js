// import model below
const { Product, User } = require("../../models");
const Joi = require("joi");
const fs = require("fs");
const response = require("../response");

// function for controller
exports.getAllProduct = async (req, res) => {
  try {
    let productsData = await Product.findAll({
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["gender", "password", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "UserId"],
      },
    });

    const productResult = JSON.parse(JSON.stringify(productsData)).map(
      (product) => {
        const productFinal = product.User;
        delete product.User;

        return {
          ...product,
          user: productFinal,
        };
      }
    );
    const result = { products: productResult };

    response.ok(res, result, 200, "successfully get all product");
  } catch (error) {
    console.log(error);
    response.error(res, error, 400, "can't get all product!!");
  }
};

exports.getProductByPartner = async (req, res) => {
  const { id } = req.params;
  try {
    const productPartner = await Product.findAll({
      where: {
        userId: id,
      },
      attributes: { exclude: ["createdAt", "updatedAt", "userId", "UserId"] },
    });

    const result = {
      product: productPartner,
    };

    if (productPartner) {
      console.log(productPartner);
      response.ok(res, result, 200, "succesfully get product by partner");
    } else {
      response.ok(res, [], 404, "product is not exist");
    }
  } catch (error) {
    response.error(res, error, 401, "can't get product by partner");
    console.log(error);
  }
};

exports.getDetailProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const detailProductPartner = await Product.findOne({
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "image",
            "role",
            "password",
            "gender",
          ],
        },
      },
      where: {
        id: id,
      },
      attributes: { exclude: ["createdAt", "updatedAt", "userId", "UserId"] },
      raw: true,
      nest: true,
    });

    const detailUser = detailProductPartner.User;
    delete detailProductPartner.User;

    const result = {
      product: { ...detailProductPartner, user: detailUser },
    };

    response.ok(res, result, 200, "successfully get product");
  } catch (error) {
    response.error(res, error, 401, "can't get product");
    console.log(error);
  }
};

exports.addBook = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, price } = req.body;
    const imageName = req.files.imageFile[0].filename;
    const url = process.env.URL;

    const schemaLogin = Joi.object({
      title: Joi.string().min(3).max(30).required(),
      price: Joi.number().min(3).required(),
    });

    const { error } = schemaLogin.validate({ title, price });
    console.log(imageName);

    if (error) return response.error(res, null, 200, error.details[0].message);

    const Book = await Product.create({
      title,
      price,
      image: url + imageName,
      userId,
    });

    const idProduct = Book.id;
    const productDetail = await Product.findOne({
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "image",
            "role",
            "password",
            "gender",
          ],
        },
      },
      where: {
        id: idProduct,
      },
      attributes: { exclude: ["createdAt", "updatedAt", "userId", "UserId"] },
    });

    const result = {
      product: productDetail,
    };

    response.ok(res, result, 200, "successfully add product");
  } catch (error) {
    console.log(error);
    response.error(res, error, 401, "failed for add product");
  }
};

exports.editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, image } = req.body;

    const editBook = await Product.update(
      {
        title,
        price,
        image,
      },
      {
        where: {
          id: id,
        },
      }
    );

    const idProduct = editBook;
    const productDetail = await Product.findOne({
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "image",
            "role",
            "password",
            "gender",
          ],
        },
      },
      where: {
        title,
      },
      attributes: { exclude: ["createdAt", "updatedAt", "userId", "UserId"] },
    });
    console.log(idProduct[0]);

    const result = {
      product: productDetail,
    };

    response.ok(res, result, 200, "successfully update product");
  } catch (error) {
    response.error(error, res);
    console.log(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // check user product
    const checkProductId = await Product.findOne({
      where: { id },
    });
    if (!checkProductId) {
      return response.ok(res, [], 200, "product is not exist");
    } else if (userId != checkProductId.userId) {
      return response.ok(res, [], 200, "you can't delete this product");
    }

    const url = process.env.URL;
    const imageName = checkProductId.image.replace(url, "");
    console.log(imageName);

    const deleteProduct = await Product.destroy({ where: { id } });

    // delete file
    fs.unlink(`./uploads/${imageName}`, (err) => {
      if (err) {
        throw err;
      }

      console.log("File is deleted.");
    });

    const result = {
      id,
    };

    response.ok(res, result, 200, "successfully delete product");
  } catch (error) {
    response.error(res, error, 401, "failed delete user");
    console.log(req.userId);
  }
};
