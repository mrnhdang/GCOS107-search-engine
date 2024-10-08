"use client";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import Link from "next/link";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [url, setUrl] = useState<string[]>([]);
  const [uiState, setUiState] = useState<{
    isLoading: boolean;
    success?: string;
    error?: any;
  }>({ isLoading: false });

  const handleSearch = async () => {
    try {
      setUiState({ isLoading: true });
      const response = await axios.get(`http://127.0.0.1:5000?query=${query}`);

      console.log("Search Results:", response.data);
      setUrl(response.data);
    } catch (error) {
      setUiState({ isLoading: false, error: error });
      console.error("Error performing search:", error);
    } finally {
      setUiState({ isLoading: false });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-start items-center align-middle space-x-4 ml-1">
        <h1 className="text-2xl font-bold">Nhập câu truy vấn: </h1>
        <FormControl className="w-96" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
          <OutlinedInput
            fullWidth
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
      </div>

      <Paper
        elevation={3}
        className="truncate flex flex-col items-center align-middle p-2 min-w-fit min-h-screen"
      >
        {uiState.isLoading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{ borderRadius: "10px", boxShadow: "1px solid black", p: 2 }}
          >
            {url.length > 0 &&
              url?.map((link) => (
                <div className="p-2 truncate max-w-[2000px]" key={link}>
                  {/* <CardContent> */}
                  {/* <Typography variant="body1" color={"blue"}> */}
                  <a className="text-sky-600 underline text-xl" href={link}>
                    {link}
                  </a>
                  {/* </Typography> */}
                  {/* </CardContent> */}
                  <Divider />
                </div>
              ))}
          </Box>
        )}
      </Paper>
    </div>
  );
};
export default Search;
