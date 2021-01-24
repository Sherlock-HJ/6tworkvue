const crypto = require('crypto');

const _algorithm = 'aes-128-cbc';
const _password = "!kjQyu#343784KJK";
const _salt = "QQKK54823123F46565ksdjafklfgfgfg";
const _iv   = "4faku!kej9E56mf2";
const _keylen = 16;
const _cipher = 'base64';
const _plain  = 'utf8';
/**
 * @util 加密、解密工具类
 */
class Aes {

    /**
     * 解密
     * @param dataStr {string}
     * @param key {string}
     * @return {string}
     */
    static decrypt(dataStr) {
        const key = crypto.scryptSync(_password, _salt, _keylen);
        const decipher = crypto.createDecipheriv(_algorithm, key, _iv);

        let decrypted  = decipher.update(dataStr, _cipher,_plain);
        decrypted  += decipher.final(_plain);
        return  decrypted ;
    }

    /**
     * 加密
     * @param dataStr {string}
     * @param key {string}
     * @return {string}
     */
    static encrypt(dataStr) {
        const key = crypto.scryptSync(_password, _salt, _keylen);
        const cipher = crypto.createCipheriv(_algorithm, key, _iv);

        let encrypted = cipher.update(dataStr, _plain, _cipher);
        encrypted += cipher.final(_cipher);
        return  encrypted;
    }
}

module.exports = Aes;