module.exports = class SoundSettings
{
    constructor(
        name,
        description,
        price,
        owner,
        creator,
        royalties,
        tags,
        ipfsURL,
        soundIPFSURL,
        timestamp,
        tokenID,
        listed)
    {
        this.name = name;
        this.tags = tags;
        this.price = price;
        this.owner = owner;
        this.creator = creator;
        this.royalties = royalties;
        this.description = description;
        this.ipfsURL = ipfsURL;
        this.soundIPFSURL = soundIPFSURL;
        this.timestamp = timestamp;
        this.tokenID = tokenID;
        this.listed = listed;
    }
}