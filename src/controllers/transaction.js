// import model below
const { User, Order, Transaction } = require("../../models");
const response = require("../response");

// function for controller
exports.getAllTransaction = async (req, res) => {
  try {
    const allTransaction = await Transaction.findAll({
      subQuery: false,
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: ["id", "fullname", "location", "email"],
        },
        {
          model: Order,
          as: "orders",
          attributes: ["id", "title", "price", "image", "qty"],
        },
      ],
      attributes: ["id", "status"],
    });

    const result = { transactions: allTransaction };

    response.ok(res, result, 200, "successfully get all transaction");
  } catch (error) {
    response.error(res, error, 401, "can't get transaction");
    console.log(error);
  }
};

// get detail transaction
exports.getDetailTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const getTransaction = await Transaction.findOne({
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: ["id", "fullname", "location", "email"],
        },
        {
          model: Order,
          as: "orders",
          attributes: ["id", "title", "price", "image", "qty"],
        },
      ],
      where: { id: transactionId },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "OrderId",
          "orderId",
          "UserId",
          "userId",
        ],
      },
    });

    const result = { transaction: getTransaction };

    response.ok(res, result, 200, "successfully get detail transaction");
  } catch (error) {
    response.error(res, error, 401, "failed get detail transaction");
    console.log(error);
  }
};

exports.addTransaction = async (req, res) => {
  const { orderId, qty } = req.body;
  const status = "on the way";
  // const userId = req.userId;
  const userId = 2;
  // req.userId;

  try {
    const createTransaction = await Transaction.create({
      userId,
      orderId,
      status,
    });

    const transactionId = createTransaction.id;
    const getTransaction = await Transaction.findOne({
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: ["id", "fullname", "location", "email"],
        },
        {
          model: Order,
          as: "orders",
          attributes: ["id", "title", "price", "image", "qty"],
        },
      ],
      attributes: ["id", "status"],
      where: { id: transactionId },
    });

    const result = {
      transaction: getTransaction,
    };
    response.ok(res, result, 401, "successfully add transaction");
  } catch (error) {
    response.error(res, error, 401, "failed get detail transaction");
    console.log(error);
  }
};

exports.editTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const { status } = req.body;

  try {
    const updateTransaction = await Transaction.update(
      { status },
      {
        where: { id: transactionId },
      }
    );

    if (!updateTransaction) {
      return response.error(res, null, 200, "transaction not exist");
    }

    const getTransaction = await Transaction.findOne({
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: ["id", "fullname", "location", "email"],
        },
        {
          model: Order,
          as: "orders",
          attributes: ["id", "title", "price", "image", "qty"],
        },
      ],
      attributes: ["id", "status"],
      where: { id: transactionId },
    });

    const result = {
      transaction: getTransaction,
    };

    response.ok(res, result, 200, "successfully edit transaction");
  } catch (error) {
    response.error(res, null, 401, "failed edit transaction");
  }
};

exports.deleteTransaction = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const checkTransaction = await Transaction.findOne({
      where: { id: transactionId },
    });
    if (!checkTransaction) {
      return response.error(res, null, 200, "transaction not exist");
    }

    const deleteTransaction = await Transaction.destroy({
      where: { id: transactionId },
    });

    const result = {
      id: deleteTransaction,
    };

    response.ok(res, result, 200, "successfully delete transaction");
  } catch (error) {
    response.error(res, null, 401, "failed delete transaction");
    console.log(error);
    console.log(transactionId);
  }
};

exports.getUserTransaction = async (req, res) => {
  try {
    const userId = req.userId;

    const getTransaction = await Transaction.findOne({
      include: [
        {
          model: User,
          as: "userOrder",
          attributes: ["id", "fullname", "location", "email"],
        },
        {
          model: Order,
          as: "orders",
          attributes: ["id", "title", "price", "image", "qty"],
        },
      ],
      where: { userId },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "OrderId",
          "orderId",
          "UserId",
          "userId",
        ],
      },
    });

    const result = { transaction: getTransaction };

    response.ok(res, result, 200, "successfully user transaction");
  } catch (error) {
    response.error(res, error, 401, "failed get user transaction");
    console.log(error);
  }
};
