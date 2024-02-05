import React, { useState } from 'react';
import axios from 'axios';
import {Buffer} from 'buffer';
import { useNavigate } from "react-router-dom";

import LoadingSpinner from '../../UI/Spinners/LoadingSpinner';
import Button from '../../UI/Buttons/Button';
import './NewSound.css';
import { 
    uploadFile, 
    getSoundIpfsURL, 
    getCloudflareUrl } 
from '../../blockchain/ipfsService';
import { 
    getNewTokenID, 
    mint, 
    connectWallet, 
    pay,
    convertTezToMutez
} from '../../blockchain/tezos/tezosUtils';
import { serverUpload } from '../../Utils/Utils'
import { uploadUserData } from '../../API/api'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import { NotificationManager } from "react-notifications";


const LOAD_DELAY_BUFFER = 1000;

// NewSound component is responsible for presenting a form to the user to upload a sound from the disk to IPFS, and then submit the asset to the Algorand network as well deply the asset's smart contract and initialize it. The method responsible for this is: fileSubmitHandler.
const NewSound = (props) => {

    const navigate = useNavigate();

    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState(0.5); // in tez
    const [ description, setDescription ] = useState("");
    const [ tags, setTags ] = useState([]);
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ selectedFiles, setSelectedFiles ] = useState([]);
    const [ minted, setMinted ] = useState(false);
    const [ royaltiesChecked, setRoyaltiesChecked ] = useState(false);
    const [ royalties, setRoyalties ] = useState(0);
    const [ royaltiesNormalized, setRoyaltiesNormalized ] = useState(0);
    const [ royaltiesNormalizedStr, setRoyaltiesNormalizedStr ] = useState('0');

    const [busy, setBusy] = useState(false);
    const [busyMsg, setBusyMsg] = useState('');

    const handleRoyaltiesCheck = (e) => {
        setRoyaltiesChecked(!royaltiesChecked);
    }

    const fileSubmitHandler = async (e) => {
        e.preventDefault();
        if(props.connectedAddress === '') await connectWallet();
        try
        {
            if(price < 0.1) {
                alert('Price must be at least 0.1 tez');
                return;
            }
            setBusyMsg('Minting...');
            setBusy(true);

            if(!royaltiesChecked) setRoyalties(0);

            // convert price from tez to mutez
            const priceMutez = await convertTezToMutez(price);
            
            const tokenID = await getNewTokenID();
            console.log('attempting to mint sound...');
            console.log('name: ' + name);
            console.log('tokenID: ' + tokenID);
            console.log('price: ' + priceMutez);
            console.log('description: ' + description);
            console.log('tags: ' + tags);
            console.log('royalties: ' + royalties);
            console.log('selectedFile: ' + selectedFile);


            const metadataURL = await uploadFile(
                selectedFile,
                name,
                royalties,
                priceMutez,
                description,
                props.connectedAddress);
    
            console.log('uploaded to IPFS ' + metadataURL);
    
            const op = await mint(
                props.connectedAddress,
                metadataURL,
                tokenID,
                priceMutez);
    
            console.log(op);
            setBusyMsg('Sound minted successfully!');

            // const cloudflareURL = await getCloudflareUrl(metadataURL); 
            setTimeout(() => {
                }, 2*LOAD_DELAY_BUFFER)

            const soundURL = await getSoundIpfsURL(metadataURL, false);

            const soundDataForDB = {
                name:name,
                price:priceMutez,
                description:description,
                tokenID:tokenID,
                ipfsURL:metadataURL,
                royalties:royalties,
                owner:props.connectedAddress,
                creator:props.connectedAddress,
                tags:tags,
                soundIPFSURL:soundURL
            }
            console.log('sound data for db: ' + JSON.stringify(soundDataForDB));

            var data = new FormData();
            data.append('name', soundDataForDB.name);
            data.append('price', soundDataForDB.price);
            data.append('description', soundDataForDB.description);
            data.append('royalties', soundDataForDB.royalties);
            data.append('owner', soundDataForDB.owner);
            data.append('creator', soundDataForDB.creator);
            data.append('ipfsURL', soundDataForDB.ipfsURL);
            data.append('tags', soundDataForDB.tags);
            data.append('tokenID', soundDataForDB.tokenID);
            data.append('soundIPFSURL', soundDataForDB.soundIPFSURL);

            const res = await uploadUserData(data);

            // const uploadUserDataResponse = await fetch('/create_sound', {
            //     method: 'POST',
            //     body: data
            // });
            // console.log('upload user data response: ' + uploadUserDataResponse);
            // const uploadData = await uploadUserDataResponse.json();

            NotificationManager.success("Successfully minted sound");
            
            // wait 2 secs and navigate to home
            setTimeout(() => {
                setBusyMsg('Sound minted successfully!');
                setMinted(true);
                navigate('/');
              }, 2*LOAD_DELAY_BUFFER)
        }
        catch(err)
        {
           console.log(err); 
           NotificationManager.error("Failed to mint sound with error: " + err);
           setMinted(false);
           setBusy(false);
        }

        setTimeout(() => {
            navigate('/');
          }, LOAD_DELAY_BUFFER)
    };

    const valueLabelFormat = (value) => {
        if(!royaltiesChecked) return '0%';
        setRoyalties(value);
        const normalized = value / 100;
        setRoyaltiesNormalized(normalized);
        setRoyaltiesNormalizedStr(normalized.toString());
        return `${value}%`
    }

    const tagsChangedHandler = (e) => {

        const newTags = e.target.value.split(' ').filter(t => {
            return t != null && t != '';
        });
        console.log('tags: ' + newTags);
        console.log(tags[0]);
        setTags(newTags);
    }

    if(busy)
    {
        return(
        <>
            <br/>
            <br/>
            <br/>
            <h3>{busyMsg}</h3>
            {!minted && <LoadingSpinner />}
        </>
        );
    }

    return (
        
        <div className="create-sound content">
            <form  encType="multipart/form-data">
                <div className='file-input'>
                    <label htmlFor="file"><p className='file-name'>Select:</p></label>
                    <input type="file" 
                        id="file" 
                        name="file"
                        onChange={(e) => setSelectedFile(e.target.files[0])}/>
                </div>
                <label htmlFor="name">Name:</label>
                <input type="text" 
                    id="name" 
                    name="name" 
                    defaultValue={name} 
                    onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="price">Price: (Tez)</label>
                <input type="number" 
                    id="price" 
                    name="price" 
                    defaultValue={price} 
                    onChange={(e) => setPrice(e.target.value)}/>
                <label htmlFor="tags">Tags:</label>
                <textarea id="tags" name="tags" onChange={tagsChangedHandler} ></textarea>

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" onChange={(e) => setDescription(e.target.value)} ></textarea>

                <br />

                <FormControlLabel 
                    control={<Checkbox  checked={royaltiesChecked}
                    onChange={handleRoyaltiesCheck} />} 
                    label="Royalties" />
                
                <br />
                <Slider valueLabelFormat={valueLabelFormat} aria-label="%" min={10} max={20} defaultValue={10} valueLabelDisplay="auto" /> 
                
                <br />
                <br /> 
                <Button onClick={fileSubmitHandler}>Submit</Button>
            </form>
        </div> 
    );
}

export default NewSound;