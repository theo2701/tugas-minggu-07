const { Logging } = require("./lib.logging");


class Error404 extends Error {
    constructor(message) {
        super(message);
        this.name = "Error404";
    }
}

class Error403 extends Error {
    constructor(message) {
      super(message);
      this.name = "Error403"
    }
  }

class Error401 extends Error {
    constructor(message) {
        super(message);
        this.name = "Error401";
    }
}

class Error400 extends Error {
    constructor(message) {
      super(message);
      this.name = "Error400"
    }
  }

const ExceptionHandler = (error, res) => {
    Logging.error(error.message)
    switch (error.name) {
        case "MongoServerError":
        return res.status(400).json({
            detail: "Pastikan data yang diinputkan benar"
        })
        case "Validation Error":
            return res.status(400).json({
                detail: "Pastikan data lengkap dan sesuai."
            })
        case "CastError":
        return res.status(400).json({
            detail: "Pastikan format id benar"
        })
        case "Error404":
        return res.status(404).json({
            detail: error.message || "Data tidak ditemukan"
        })
        case "Error401":
        return res.status(401).json({
            detail: error.message || "Unauthorized"
        })
        case "Error403":
        return res.status(403).json({detail: error.message || "Forbidden"})
        case "Error400":
        return res.status(400).json({detail: error.message || "Pastikan data lengkap dan sesuai."})
        default:
        return res.status(500).json({
            detail: "Terjadi kesalahan pada server"
        })
    }
}

module.exports = {
    Error404,
    Error401,
    Error403,
    Error400,
    ExceptionHandler
}