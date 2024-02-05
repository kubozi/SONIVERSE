import React, { useState } from 'react';
import axios from 'axios';
import {Buffer} from 'buffer';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../UI/Spinners/LoadingSpinner';
import Button from '../../UI/Buttons/Button';
import './NewSound2.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';

const NewSound2 = (props) => {

    const navigate = useNavigate();

    window.Buffer = Buffer;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [tags, setTags] = useState([]);
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ royaltiesChecked, setRoyaltiesChecked ] = useState(false);
    const [ royaltiesValue, setRoyaltiesValue ] = useState(0);
    const [ royaltiesPercentage, setRoyaltiesPercentage ] = useState(0);
    const [ royaltiesPercentageThousands, setRoyaltiesPercentageThousands ] = useState(0);
    const [ description, setDescription ] = useState('');
    const [ sampleRate, setSampleRate ] = useState('');
    const [ channels, setChannels ] = useState('');
    const [ type, setType ] = useState('');
    const [ duration, setDuration ] = useState('');

    const [busy, setBusy] = useState(false);
    const [busyMsg, setBusyMsg] = useState('');




    const fileSubmitHandler = async (e) => {
    }
    const handleRoyaltiesChecked = (event) => {
    }
    const tagsChangedHandler = (event) => {
    }
    const handleRoyaltiesCheck = (event) => {


    const valueLabelFormat = (value) => {
        console.log(value);
        return `${value}%`
    }


    // if(busy)
    // {
    //     return(
    //     <>
    //         <h3>{busyMsg}</h3>
    //         <LoadingSpinner />
    //     </>
    //     );
    // }

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
                <label htmlFor="tags">tags:</label>
                <textarea id="tags" name="tags" onChange={tagsChangedHandler} ></textarea>

                <label htmlFor="description">description</label>
                <textarea id="description" name="description" onChange={(e) => setDescription(e.target.value)} ></textarea>

                <br />

                <FormControlLabel 
                    control={<Checkbox  checked={royaltiesChecked}
                    onChange={handleRoyaltiesCheck} />} 
                    label="Royalties" />
                
                <br />
                { royaltiesChecked && 
                <Slider valueLabelFormat={valueLabelFormat} aria-label="%" min={0} max={20} defaultValue={50} valueLabelDisplay="auto" /> 
                }
                <br />
                <br /> 
                <Button onClick={fileSubmitHandler}>Submit</Button>
            </form>
        </div> 
    
    );

}
}


export default NewSound2;