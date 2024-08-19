"use client";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
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
    <div className="w-screen">
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

      <div className="flex flex-col justify-between items-center">
        {" "}
        {uiState.isLoading ? (
          <CircularProgress />
        ) : (
          <Box>
            {url.map((link) => (
              <Card sx={{ mb: 2, maxWidth: "100%" }} key={link}>
                <CardContent>
                  <Typography variant="body1">
                    <Link href={link}>{link}</Link>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </div>
    </div>
  );
};
export default Search;
