const express = require("express");
const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
const { OrderCreate, OrderDetail, OrderList } = require("./order.controller");
const { OrderNomorValidator, OrderTanggalValidator, OrderCustomerValidator, OrderItemsValidator, OrderItemsQtyValidator, OrderItemsSubtotalValidator, OrderDibayarValidator } = require("./order.validation");
const { CustomerNomorValidator, CustomerNamaValidator, CustomerAlamatValidator, CustomerTeleponValidator, CustomerIDValidator } = require("../customer/customer.validation");
const { BarangNomorValidator, BarangNamaValidator, BarangSatuanValidator, BarangHargaJualValidator, BarangStokValidator, BarangIDValidator } = require("../barang/barang.validation");
const { createReceiptFromOrder } = require("../receipt/receipt.controller");
const { ExceptionHandler } = require("../libs/lib.exception");

const OrderRouter = express.Router();

OrderRouter.get('/', [
  IsAuthenticated,
], OrderList)
OrderRouter.post('/', [
  IsAuthenticated,
  Validate([
    OrderNomorValidator(),
    OrderTanggalValidator(),
    OrderCustomerValidator(),
    CustomerNomorValidator(false, false, true,"customer.nomor"),
    CustomerIDValidator(false, "customer._id"),
    CustomerNamaValidator(false, "customer.nama"),
    CustomerAlamatValidator(false, "customer.alamat"),
    CustomerTeleponValidator(false, "customer.telepon"),
    OrderDibayarValidator(),
    OrderItemsValidator(),
    OrderItemsQtyValidator(),
    OrderItemsSubtotalValidator(),
    BarangIDValidator("items.*._id"),
    BarangNomorValidator(true, false, "items.*.nomor"),
    BarangNamaValidator(false, "items.*.nama"),
    BarangSatuanValidator(false, "items.*.satuan"),
    BarangHargaJualValidator(false, "items.*.hargaJual"),
    BarangStokValidator(false, "items.*.stok")
  ])
], OrderCreate)
OrderRouter.get('/:id', [IsAuthenticated], OrderDetail)
OrderRouter.post('/:id/receipt', [IsAuthenticated], async (req, res) => {
  try {
    const receipt = await createReceiptFromOrder(req.params.id);
    return res.status(201).json(receipt);
}catch (error) {
  console.log(error);
  return ExceptionHandler(error, res);
}
})

module.exports = {
  OrderRouter
}