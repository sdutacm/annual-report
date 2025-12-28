// scripts/upload-to-cos.js
// 用于将 dist 目录下的产物上传到 COS annual-report-2025 目录

const COS = require('cos-nodejs-sdk-v5');
const path = require('path');
const fs = require('fs');

const COS_SECRET_ID = process.env.COS_SECRET_ID;
const COS_SECRET_KEY = process.env.COS_SECRET_KEY;
const COS_BUCKET = process.env.COS_BUCKET;
const COS_REGION = process.env.COS_REGION;
const COS_PREFIX = 'annual-report-2025/';

const cos = new COS({
  SecretId: COS_SECRET_ID,
  SecretKey: COS_SECRET_KEY,
});

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function uploadFile(filePath) {
  const Key = COS_PREFIX + path.relative('dist', filePath).replace(/\\/g, '/');
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket: COS_BUCKET,
      Region: COS_REGION,
      Key,
      Body: fs.createReadStream(filePath),
    }, (err, data) => {
      if (err) {
        console.error('上传失败:', filePath, err);
        reject(err);
      } else {
        console.log('上传成功:', Key);
        resolve(data);
      }
    });
  });
}

async function main() {
  const files = [];
  walkDir('dist', (file) => files.push(file));
  for (const file of files) {
    await uploadFile(file);
  }
  console.log('全部上传完成');
}

main().catch(err => {
  console.error('上传过程出错:', err);
  process.exit(1);
});
