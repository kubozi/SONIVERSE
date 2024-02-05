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

// generate valid url for ipfs
const generateIPFSURL = (url) => {
    if(url)
    {
        let newUrl = url.replace('ipfs://', '');
        return 'https://ipfs.io/ipfs/' + newUrl;
    }
    return null;
}

const getShortLoadDelayBuffer = () => 150;

const serverUpload = () => false;

const tagsCleaner = (tags) => 
{
    console.log('cleaning tags' + tags);
    let cleanedTags = [];
    if(tags == undefined) return cleanedTags;
    for(let i = 0; i < tags.length; i++)
    {
        cleanedTags.push(tags[i].replace(/,+$/, ""));
    }
    return cleanedTags;
}

module.exports = {
    toUint8Array,
    stringToUint8Array,
    getShortAddress,
    addHttpsUrl,
    getShortLoadDelayBuffer,
    serverUpload,
    tagsCleaner,
    generateIPFSURL,
}