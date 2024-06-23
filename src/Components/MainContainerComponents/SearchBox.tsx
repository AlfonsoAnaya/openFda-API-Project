import * as React from 'react';

//Stores
import useSkipStore from '../../Zustand/SkipStores';
import useSearchQueryStore from '../../Zustand/SearchQueryStore';

//Material UI Components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

//CSS
import './SearchBox.css'



interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: any;
  setSearchListener: React.Dispatch<React.SetStateAction<number>>;
}

export default function SearchBox({ searchQuery, setSearchQuery, setSearchListener }: SearchBoxProps) {
  //skip store
  const updateSkip = useSkipStore((state) => state.updateSkip)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    updateSkip(0);
    setSearchListener((prev) => prev+1)
  }

  return (
    <div className="flex-row search-container">
    <Box
      
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
      className="search-box"
        id="filled-basic"
        label="Search"
        variant="filled"
        placeholder="Search by active ingredient"
        value={searchQuery} // Controlled value
        onChange={handleInputChange} // Update state on change
      />
    </Box>
    <Button 
      variant="contained"
      onClick={handleSearch}
    >
        Search
      </Button>
    </div>

  );
}
