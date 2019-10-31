import mongoose from "mongoose";

// Mongo

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://192.168.99.100:27017/upload",
      { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
    );
  }
}

export default new Database();
