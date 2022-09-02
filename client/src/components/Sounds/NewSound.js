import React, { useState } from 'react';
import axios from 'axios';
import {Buffer} from 'buffer';
import { useHistory } from "react-router-dom";

import LoadingSpinner from '../../UI/Spinners/LoadingSpinner';
import Button from '../../UI/Buttons/Button';
import './NewSound.css';
import { uploadFile } from '../../blockchain/ipfsService';
import { getNewTokenID, mint, connectWallet } from '../../blockchain/tezos/tezosUtils';
import { upload } from '@testing-library/user-event/dist/upload';
const fs = require('fs');

const LOAD_DELAY_BUFFER = 2000;

const NewSound = (props) => {

    const history = useHistory();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ selectedFiles, setSelectedFiles ] = useState([]);
    const [ minted, setMinted ] = useState(false);

    const [busy, setBusy] = useState(false);
    const [busyMsg, setBusyMsg] = useState('');

    const fileSubmitHandler = async (e) => {

        console.log(props.connectedAddress);

        e.preventDefault();

        if(props.connectedAddress === '') await connectWallet();

        // if(!name || !price || !selectedFile) return;

        // const fileExt = selectedFile['name'].split('.').pop().toUpperCase();
        // if(fileExt !== 'WAV')
        // {
        //     console.error('Only audio files are allowed for upload');
        //     return;
        // }

        console.log('test');
        setBusyMsg('Minting...');
        setBusy(true);

        const tokenID = await getNewTokenID();

        const metadataURL = await uploadFile(
            selectedFiles,
            name,
            description,
            props.connectedAddress);

        console.log('uploaded to IPFS ' + metadataURL);

        const op = await mint(
            props.connectedAddress,
            metadataURL,
            tokenID,
            price);

        console.log(op);
        setBusyMsg('Sound minted successfully!');
        // setBusy(false);
        setMinted(true);

        setTimeout(() => {
            history.push('/');
          }, LOAD_DELAY_BUFFER)
    };

    const tagsChangedHandler = (e) => {

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
            <label htmlFor="file">Select a file:</label>
            <input type="file" 
                   id="file" 
                   name="file"
                   onChange={(e) => setSelectedFiles(e.target.files)}/>
            <label htmlFor="name">name:</label>
            <input type="text" 
                   id="name" 
                   name="name" 
                   defaultValue={name} 
                   onChange={(e) => setName(e.target.value)}/>
            <label htmlFor="price">price:</label>
            <input type="number" 
                   id="price" 
                   name="price" 
                   defaultValue={price} 
                   onChange={(e) => setPrice(e.target.value)}/>
            <label htmlFor="description">description:</label>
            <textarea id="description" name="description" onChange={(e) => setDescription(e.target.value)} />
            {/* <label htmlFor="tags">tags:</label>
            <textarea id="tags" name="tags" onChange={tagsChangedHandler} ></textarea> */}
            <br/>
            <br/>
            <br/>
            <Button onClick={fileSubmitHandler}>Submit</Button>
            </form>
        </div> 
    
    );
}

export default NewSound;