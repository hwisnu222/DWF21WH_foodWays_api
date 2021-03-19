// import model below
const { Product, User } = require("../../models");
const response = require("../response");
// function for controller
exports.getAllProduct = async (req, res) => {
  try {
    let productsData = await Product.findAll({
      include: {
        model: User,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      attributes: { exclude: ["createdAt", "updatedAt", "userId", "UserId"] },
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

    response.ok(result, res);
  } catch (error) {
    console.log(error);
    response.error(error, res);
  }
};

exports.getProductByPartner = async (req, res) => {
  const { id } = req.params;
  try {
    const productPartner = await Product.findOne({
      where: {
        userId: id,
      },
      attributes: { exclude: ["createdAt", "updatedAt", "userId", "UserId"] },
    });

    const result = {
      product: productPartner,
    };

    response.ok(result, res);
  } catch (error) {
    response.error(error, res);
  }
};

exports.getDetailProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const detailProductPartner = await Product.findOne({
      include: {
        model: User,
        attributes: { exclude: ["createdAt", "updatedAt", "image", "role"] },
      },
      where: {
        id: id,
      },
      attributes: { exclude: ["createdAt", "updatedAt", "userId", "UserId"] },
    });

    const result = {
      product: detailProductPartner,
    };
    response.ok(result, res);
  } catch (error) {
    response.error(error, res);
  }
};

exports.addBook = (req, res) => {
  try {
  } catch (error) {}
};

exports.editBook = (req, res) => {
  try {
  } catch (error) {}
};

exports.deleteProduct = (req, res) => {
  try {
  } catch (error) {}
};
