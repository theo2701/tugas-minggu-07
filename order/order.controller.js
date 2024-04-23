const { Pagination } = require("../libs/lib.common");
const { ExceptionHandler, Error404 } = require("../libs/lib.exception");
const { createReceiptFromOrder } = require("../receipt/receipt.controller");
const { OrderModel } = require("./order.model");
const { OrderSearch, OrderFilter } = require("./order.search");
const { CheckItems } = require("./order.service");

async function OrderList(req, res) {
  try {
    const result = OrderModel.find();
    const search = OrderSearch(req, result);
    const filter = OrderFilter(req, search);
    const paging = await Pagination(req, res, filter);
    return res.status(200).json(paging);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res);
  }
}

async function OrderCreate(req, res) {
  try {
    await CheckItems(req.body);
    const result = await OrderModel.create(req.body);
    await createReceiptFromOrder(result._id);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res)
  }
}

async function OrderDetail(req, res) {
  try {
    const result = await OrderModel.findOne({_id: req.params.id});

    if (!result) {
      throw new Error404("Order tidak tersedia");
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res)
  }
}


module.exports = {
  OrderList,
  OrderCreate,
  OrderDetail,
}