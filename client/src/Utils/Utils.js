const toUint8Array = (n) => {
    if (!n) return new ArrayBuffer(0)
    const a = []
    a.unshift(n & 255)
    while (n >= 256) {
      n = n >>> 8
      a.unshift(n & 255)
    }
    return new Uint8Array(a)
}

const stringToUint8Array = (value) =>
{
    var enc = new TextEncoder();
    return enc.encode(value);
}

const getShortAddress = (address) => {
    address = address.toString().toUpperCase();
    if(address)
    {
        return(
                address.slice(0,6) + 
                "..." + 
                address.slice(address.length - 4, address.length));
    }
    return null;
}

const addHttpsUrl = (url) => 'https://' + url;

module.exports = {
    toUint8Array,
    stringToUint8Array,
    getShortAddress,
    addHttpsUrl
}