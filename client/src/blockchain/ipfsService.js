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
    const mrRes = await axios.get('https://' + fullMetadataURL);
    let data = mrRes.data;
    let soundURL = data.image.replace('ipfs://', 'ipfs.io/ipfs/');
    return 'https://' + soundURL;
};

// https://cloudflare-ipfs.com/ipfs/bafyreifsbicxqmcu6yiffjmbpo2qooslewctgyy5jyboao4hclcdv2aqse/metadata.json
export const getCloudflareUrl = async (metadataURL) => {
    const cloudflareURL = metadataURL.replace('ipfs://', 'cloudflare-ipfs.com/ipfs/');
    return cloudflareURL;
};

