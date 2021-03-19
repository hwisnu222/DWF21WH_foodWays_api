// import model below
const { Product, User } = require("../../models");
const response = require("../response");
// function for controller
exports.getAllProduct = async (req, res) => {
  try {
    let productsData = await Product.findAll({
      include: {
        model: User,
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
    });

    const result = {
      product: detailProductPartner,
    };
    response.ok(result, res);
  } catch (error) {
    response.error(error, res);
  }
};

exports.addBook = async (req, res) => {
  console.log("registration");
  try {
    const { title, price, image } = req.body;
    const userId = 33;

    const Book = await Product.create({
      title,
      price,
      image,
      userId,
    });

    const idProduct = Book.id;
    const productDetail = await Product.findOne({
      include: {
        model: User,
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

    response.ok(result, res);
  } catch (error) {
    console.log(error);
    response.error(error);
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

    response.ok(result, res);
  } catch (error) {
    response.error(error, res);
    console.log(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.destroy({ where: { id } });

    const result = {
      id,
    };

    response.ok(result, res);
  } catch (error) {
    response.error(error, res);
    console.log(error);
  }
};
