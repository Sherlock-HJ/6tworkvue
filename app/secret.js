
const _password = "!kjQyu#343784KJK";
const _keylen = 16;
const _cipher = 'base64';
const _plain  = 'utf8';
/**
 * @util 加密、解密工具类
 */
class Whj {

    /**
     * 解密
     * @param dataStr {string}
     * @param key {string}
     * @return {string}
     */
    static decrypt(dataStr) {
        if (dataStr.length === 0) {return '';}
        dataStr = dataStr.split('').map(a=>{
            return a.toUpperCase(a)==a?a.toLowerCase():a.toUpperCase();
        }).join('');
        const buf = Buffer.from(dataStr,_cipher);
        return  buf.toString(_plain) ;
    }

    /**
     * 加密
     * @param dataStr {string}
     * @param key {string}
     * @return {string}
     */
    static encrypt(dataStr) {
        if (dataStr.length === 0) {return '';}
        const buf = Buffer.from(dataStr,_plain);
        return  buf.toString(_cipher).split('').map(a=>{
            return a.toUpperCase(a)==a?a.toLowerCase():a.toUpperCase();
        }).join('');
    }
}

module.exports = Whj;