"use client";
import axios from "axios"
import {
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
const Search = () => {
  const [query, setQuery] = useState<string>("");
  const handleSearch = () => {
    alert(query);
  };
  return (
    <Container
      sx={{
        height: "100vh",
        width: "100vh",
      }}
    >
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
        <OutlinedInput
          onChange={(e) => setQuery(e.target.value)}
          id="outlined-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleSearch}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
    </Container>
  );
};
export default Search;
