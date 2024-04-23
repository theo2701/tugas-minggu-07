
const mongoose = require("mongoose");

const KasSchema = new mongoose.Schema({
  nomorReferensi: {
    type: String,
    required: true
  },
  jumlahKeluar: {
    type: Number,
    default: 0
  },
  jumlahMasuk: {
    type: Number,
    default: 0
  },
  tanggal: {
    type: Date,
    default: Date.now
  }
});

const KasModel = mongoose.model("Kas", KasSchema);

module.exports = {
  KasSchema,
  KasModel
};
