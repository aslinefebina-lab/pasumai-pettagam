const mongoose = require('mongoose');

async function connectDB(uri) {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 3000
  });
}

module.exports = connectDB;
