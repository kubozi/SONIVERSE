const { uploadFileW3S } = require('./web3StorageWrapper');
const { uploadFileNFTS } = require('./web3StorageWrapper');

export const uploadFile = async (
    soundfile,
    name,
    description,
    owner) => 
{
    return await uploadFileNFTS(
        soundfile,
        name,
        description,
        owner);
};