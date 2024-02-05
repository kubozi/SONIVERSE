import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import Select from 'react-select';
import {
    Container,
    SearchInput,
    IconRightArrow,
    IconMagnifyingGlass
  } from "./SearchBarStyle";
import { searchSounds } from "../../API/api"
import './SearchBar.css';

const SearchBar = (props) => {

    const targetRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const showSearchInput = isHovered || isFocused;

    useEffect(() => {
      const keyDownHandler = event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          searchToggle();
        }
      };
  
      document.addEventListener('keydown', keyDownHandler);
  
      return () => {
        document.removeEventListener('keydown', keyDownHandler);
      };
    }, []);

    const searchToggle = async () => {
        let searchText = targetRef.current.value;
        console.log('search text: ' + searchText);
        if(searchText === '') return;

        let searchData = {
          sounds: [],
          searchTerm: searchText
        }
        try
        {
          const soundData = await searchSounds(searchText);
          searchData = {
            sounds: soundData,
            searchTerm: searchText}
        }
        catch(err)
        {
          console.log(err);
        }

        props.onSearchResults(searchData);
    }

    return (
      <>
      
        <div>
          <Container
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            hover={showSearchInput}>

            <SearchInput className="search-input" ref={targetRef} showSearchInput={showSearchInput} />
            {showSearchInput ? <IconRightArrow className='search-icon'/> : <IconMagnifyingGlass className='search-icon'/>}
          </Container>
        </div>
      </>
      );
    }

export default SearchBar;