import config from '../config';
import { NFTStorage, File } from 'nft.storage';

export const uploadFileNFTS = async(
    soundfile,
    name,
    royalties,
    price,
    description,
    owner) => {
        try
        {
            const token = config.IPFS_NFTS_TOKEN;
            const client = new NFTStorage({ token: token });
            const metadata = await client.store({
                name: name,
                royalties: royalties,
                price: price,
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