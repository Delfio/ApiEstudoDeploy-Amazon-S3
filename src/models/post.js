import mongoose from "mongoose";
import aws from "aws-sdk";

import fs from "fs"; // LIB DO NODE PARA LIDAR COM ARQUIVOS - RED DELET
import path from "path"; //CAMINHOS PADRÕES
import { promisify } from "util"; // CONVERTE UMA FUNÇÃO DE CB PARA UMA ASYNC

const s3 = new aws.S3({});

const PostSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//MIDLEWARE DO MONGOOSE
PostSchema.pre("save", function() {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/file/${this.key}`;
  }
});

PostSchema.pre("remove", function() {
  if (process.env.STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: this.key
      })
      .promise();
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "temp", "uploads", this.key)
    );
  }
});

module.exports = mongoose.model("Post", PostSchema);
