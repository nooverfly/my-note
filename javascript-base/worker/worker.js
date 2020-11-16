importScripts("https://cdn.bootcdn.net/ajax/libs/crypto-js/3.3.0/crypto-js.min.js");

// 同步加载脚本并依次执行
importScripts("./test1.js");
importScripts("./test2.js");

// 任意顺序下载, 但脚本严格以参数的顺序执行
importScripts("./test2.js", "./test1.js");

var iv = CryptoJS.enc.Utf8.parse("ABCDEF1234123412");

// aes加密
function encrypt(key, word) {
    key = CryptoJS.enc.Utf8.parse(key);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString();
}

function decrypt(key, word) {
    var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    key = CryptoJS.enc.Utf8.parse(key);
    var decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypt.toString(CryptoJS.enc.Utf8).toString();
}

self.onmessage = function (event) {
    var data = event.data;
    var result = "";
    console.log(self.name);
    switch (data.type) {
        case "encrypt":
            result = encrypt(data.key, data.word);
            break;
        case "decrypt":
            result = decrypt(data.key, data.word);
            break;
        default:
            result = "";
    }
    self.postMessage({
        result: result,
        type: data.type
    });
}
