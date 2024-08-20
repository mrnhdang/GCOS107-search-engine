"use client";

import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

const WebCrawler = () => {
  const [query, setQuery] = useState<string>("");
  const [url, setUrl] = useState<string[]>([]);
  const [uiState, setUiState] = useState<{
    isLoading: boolean;
    success?: string;
    error?: any;
  }>({ isLoading: false });

  const handleAdd = () => {
    query.trim() && setUrl((prev) => [...prev, query]);
    setQuery("");
  };
  const clearUrl = (removedIndex: number) => {
    setUrl(url.filter((item, index) => index !== removedIndex));
    setQuery("");
  };

  const handleCrawl = async () => {
    let success, err;
    try {
      setUiState({ isLoading: true });
      const response = await axios.post(`http://127.0.0.1:5000/web/add`, url);

      console.log("Search Results:", response.data);
      success = response.data;
      setUiState({ isLoading: false });
      setUrl([]);
      setQuery("");
    } catch (error) {
      err = error;
      setUiState({ isLoading: false });
      console.error("Error performing search:", error);
    } finally {
      setUiState({ isLoading: false, success, error: err });
    }
  };
  useEffect(() => {
    query && setUiState({ isLoading: false });
  }, [query]);
  
  return (
    <div className="w-screen space-y-2">
      <div className="flex justify-start items-center align-middle space-x-4 ml-1">
        <h1 className="text-2xl font-bold">Nhập URL: </h1>
        <FormControl className="w-96" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">URL</InputLabel>
          <OutlinedInput
            value={query}
            fullWidth
            onChange={(e) => setQuery(e.target.value)}
            id="outlined-adornment-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleAdd}
                  edge="end"
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {url?.length > 0 && (
          <Button className="flex" onClick={handleCrawl}>
            Crawl
          </Button>
        )}
      </div>
      <Paper
        elevation={3}
        className="flex flex-col items-center align-middle p-2 h-screen"
      >
        {url?.map((link, index) => (
          <div key={index} className="flex items-center space-x-1">
            <h1>{link}</h1>
            <IconButton onClick={() => clearUrl(index)}>
              <ClearIcon />
            </IconButton>
          </div>
        ))}

        {uiState?.isLoading && <CircularProgress />}
        {uiState?.success && (
          <Alert variant="standard" sx={{ width: "300px" }}>
            {uiState?.success}
          </Alert>
        )}
        {uiState?.error && <Alert variant="standard">{uiState?.error}</Alert>}
      </Paper>
    </div>
  );
};
export default WebCrawler;
