const { uploadFileW3S } = require('./web3StorageWrapper');
const { uploadFileNFTS } = require('./web3StorageWrapper');

const uploadFile = async (
    soundfile,
    name,
    description,
    owner) => 
{
    // return await uploadFileW3S(
    //     soundfile, 
    //     name, 
    //     description, 
    //     owner);

    return await uploadFileNFTS(
        soundfile,
        name,
        description,
        owner);
};

module.exports = 
{
    uploadFile,
}