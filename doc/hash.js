let entry = {
  page1: "page1",
  page2: "page2",
};

let page1 = "require title1";
let page2 = "require title2";

let title1 = " title1";
let title2 = " title2";

let crypto = require("crypto");

let md5 = crypto.createHash("md5");
let contentHash = md5.update(title1).digest("hex");

console.log("contentHash", contentHash);

// page1 中引入的 title1 所以也要监听title1
// chunkHash
let page1ChunkHash = md5.update(page1).update(title1);
console.log("page1ChunkHash", page1ChunkHash);

// hash 整个项目的hash
let hash = md5
  .update(page1)
  .update(title1)
  .update(page2)
  .update(title2);

// 变化快慢 hash > chunkHash > contentHash

// 不管哪一个变化，hash都会改变
/**
 * 文件的名字
 * 入口文件，自己指定
 * 非入口文件
 *  import()  绝对路径转换的 例如：./utils  => src_utils_js
 *  代码分割  vendor common 自己指定的
 */
