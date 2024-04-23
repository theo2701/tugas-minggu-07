const { OrderModel } = require("../order/order.model");
const { KasModel } = require("./receipt.model");


async function createReceiptFromOrder(orderId) {
  try {
    const order = await OrderModel.findOne({ _id: orderId });
    
    if (!order) {
      throw new Error("Order tidak ditemukan");
    }

    const kasData = {
      nomorReferensi: order.nomor,
      jumlahKeluar: order.total, 
      jumlahMasuk: 0,
      tanggal: order.tanggal
    };

    const kas = await KasModel.create(kasData);

    return kas;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createReceiptFromOrder,
}
