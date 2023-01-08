import axios from 'axios';
const { uploadFileW3S } = require('./web3StorageWrapper');
const { uploadFileNFTS } = require('./web3StorageWrapper');

export const uploadFile = async (
    soundfile,
    name,
    royalties,
    price,
    description,
    owner) => 
{
    return await uploadFileNFTS(
        soundfile,
        name,
        royalties,
        price,
        description,
        owner);
};

// metadata url in form of ipfs://Qm...
export const getSoundIpfsURL = async (metadataURL, isConcise) => {
    const fullMetadataURL = metadataURL.replace('ipfs://', 'ipfs.io/ipfs/');
    const mrRes = await axios.get('http://' + fullMetadataURL);
    let data = mrRes.data;
    let soundURL = data.image.replace('ipfs://', 'ipfs.io/ipfs/');
    return 'https://' + soundURL;
};

export const getCloudflareUrl = async (metadataURL) => {
    const cloudflareURL = metadataURL.replace('ipfs://', 'cloudflare-ipfs.com/ipfs/');
    return cloudflareURL;
};

