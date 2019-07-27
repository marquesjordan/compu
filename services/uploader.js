const keys = require('../config/keys');
const AWS = require('aws-sdk');
const bluebird = require('bluebird');
const s3Bucket = keys.s3Bucket;
const awsAccessKeyId = keys.awsAccessKeyId;
const awsSecretAccess = keys.awsSecretAccess;

class Uploader {
  constructor() {
    // configure the keys for accessing AWS
    AWS.config.update({
      accessKeyId: awsAccessKeyId,
      secretAccessKey: awsSecretAccess
    });

    // configure AWS to work with promises
    AWS.config.setPromisesDependency(bluebird);

    this.s3 = new AWS.S3();
  }

  async uploadFile(buffer, name, type) {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: s3Bucket,
      ContentType: type.mime,
      Key: `${name}.${type.ext}`
    };
    const upload = await this.s3.upload(params);

    const data = await upload.promise();

    return data;
  }

  async deleteFile(obj) {
    const params = {
      Bucket: s3Bucket,
      Key: obj.photo
    }
    
    this.s3.deleteObject(params, function (err, data) {
        if (data) {
            console.log("File deleted successfully");
        }
        else {
            console.log("Check if you have sufficient permissions : "+err);
        }
    });
    return;
  }


}



module.exports = Uploader;
