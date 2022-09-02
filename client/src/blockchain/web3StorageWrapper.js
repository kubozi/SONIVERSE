import config from '../config';
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js"; // webpack4 workaround
import { NFTStorage, File } from 'nft.storage/dist/bundle.esm.min.js';

export const uploadFileNFTS = async(
    soundfile,
    name,
    description,
    owner) => {
        try
        {
            soundfile = soundfile[0];
            console.log("NFT STORAGE: ")
            console.log('soundfile: ' + soundfile);
            console.log('name: ' + name);
            const token = config.IPFS_NFTS_TOKEN;
            const client = new NFTStorage({ token: token });
            const metadata = await client.store({
                name: name,
                description: description,
                image: new File([soundfile], soundfile.name, {type: soundfile.type}),
                artifactUri: new File([soundfile], soundfile.name, {type: soundfile.type}),
                displayUri: new File([soundfile], soundfile.name, {type: soundfile.type}),
                thumbnailUri: new File([soundfile], soundfile.name, {type: soundfile.type}),
                creator: owner
            });
            return metadata.url;
        }
        catch(err)
        {
            console.error(err);
            return 0;
        }
    };

    export const uploadFileW3S = async (
        soundfiles,
        name,
        description,
        owner) => {
        console.log('uploading file w3s');
        try
        {
            const token = config.IPFS_W3S_TOKEN;
            const client = new Web3Storage({ token: token });
            const rootCID = await client.put(soundfiles);
            const info = await client.status(rootCID);
            const res = await client.get(rootCID);
            const files = await res.files();
            for (const file of files) {
                console.log(`${file.cid} ${file.name} ${file.size}`)
                console.log('uploaded?');
                return file.cid
            }
        }
        catch(err) { console.error(err); }
    }