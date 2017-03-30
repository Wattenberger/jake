exports.WEBPACK_HOST = process.env.HOST               || "jake.vision"
exports.WEBPACK_PORT = parseInt(process.env.PORT)     || 5000
exports.STATIC_HOST  = process.env.STATIC_HOST        || exports.WEBPACK_HOST
