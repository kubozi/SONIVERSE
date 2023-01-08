const Sound = require('../models/sound');
const SoundSettings = require('../models/soundSettings');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const bodyParser = require('body-parser');
const { token } = require('morgan');
let urlencodedParser = bodyParser.urlencoded({ extended: false });

const index = (req, res) => {

    console.log('in sound controller index: ');

    Sound.find().sort({ createdAt: -1 })
        .then((result) =>
        {
            // get last 10 sounds
            const max = 10;
            const filteredSounds = result.slice(0, max);
            res.json(filteredSounds);
            console.log(filteredSounds);
        })
        .catch((err) =>
        {
            console.log(err);
        });
};

const create_sound = async (req, res) => {
    console.log('in sound controller create_sound: ');

    try
    {
        const form = new formidable.IncomingForm();

        let soundSettings = new SoundSettings();
    
        await new Promise((resolve, reject) =>
        {
            form.parse(req, function(err, fields, files){
                soundSettings.name = fields['name'];
                soundSettings.tags = fields['tags'].match(/\S+/g) || []
                soundSettings.price = fields['price'];
                soundSettings.owner = fields['owner'];
                soundSettings.creator = fields['creator'];
                soundSettings.description = fields['description'];
                soundSettings.royalties = fields['royalties'];
                soundSettings.tokenID = fields['tokenID'];
                soundSettings.ipfsURL = fields['ipfsURL'];
                soundSettings.listed = true;
                soundSettings.soundIPFSURL = fields['soundIPFSURL'];
                resolve();
            });
        });
    
        let sound = new Sound(soundSettings);
        console.log('saving sound to DB...');
    
        sound.save()
        .then((result) => { return sound._id })
        .catch((err) =>
        {
            console.log(err);
            return false;
        });

        console.log('sound saved to DB...');
    
        res.status(200).send(sound);
    }
    catch(err)
    {
        res.status(400).send(err);
    }
}

const update_owner = async (req, res) => {
    console.log('in sound controller update_owner: ');
    const tokenID = req.body['tokenID']['tokenID'];
    const buyerAddress = req.body['tokenID']['buyerAddress'];
    console.log('tokenid', tokenID);
    console.log('buyerAddress', buyerAddress);

    const query = {'tokenID' : tokenID};
    const update = { 
        'owner': buyerAddress, 
        'listed': false 
    };

    Sound.findOneAndUpdate(query, update, {upsert: false}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });
}

const sound_details = (req, res) => {
    const id = req.params.id;
    console.log('sounds id get req ', id);

    Sound.findOne({tokenID: id})
        .then((result) =>
        {
            console.log('found sound: ', result);
            res.json(result);
        })
        .catch((err) =>
        {
            console.log(err);
        });
};

const get_sounds_by_owner = (req, res) => {
    const owner = req.params.owner;
    console.log('sounds owner get req ', owner);
    // get sounds by owner

    Sound.find({ owner: owner })
    .then((result) =>
    {
        console.log('found sounds: ', result);
        res.json(result);
    })
    .catch((err) =>
    {
        console.log(err);
    });
}

const update_relisted_sound = async (req, res) => {
    console.log('updating relisted sound...');
    const tokenID = req.body['tokenID'];
    const price = req.body['price'];
    console.log('tokenID: ', tokenID);
    console.log('price: ', price);
    const query = {'tokenID' : tokenID};
    const update = { 
        'price': price,
        'listed': true 
    };

    Sound.findOneAndUpdate(query, update, {upsert: false}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });
}

module.exports = 
{
    index,
    create_sound,
    update_owner,
    sound_details,
    get_sounds_by_owner,
    update_relisted_sound,
}