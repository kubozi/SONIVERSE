const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const soundSchema = new Schema(
{
    name: 
    {
        type: String,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    },
    creator:
    {
        type:String,
        required: true
    },
    owner:
    {
        type: String,
        required: true
    },
    tokenID:
    {
        type: String,
        required: true
    },
    ipfsURL:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    tags: 
    [{
        type: String
    }],
    required: false,
    royalties:
    {
        type: String,
        required: true,
        default: 0
    },
    sampleRate:
    {
        type: String,
        required: false
    },
    type:
    {
        type: String,
        required: false
    },
    channels:
    {
        type: String,
        required: false
    },
    duration:
    {
        type: String,
        required: false
    },
    listed:
    {
        type: Boolean,
        required:true
    },
    soundIPFSURL:
    {
        type: String,
        required: true
    }
},
{ timestamps: true });

// mongodb will look for Sounds ( we defined Sound model )
const Sound = mongoose.model('Sound', soundSchema);
module.exports = Sound;