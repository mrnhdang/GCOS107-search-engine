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
import { useState } from "react";
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
  };
  const clearUrl = (removedIndex: number) => {
    setUrl(url.filter((item, index) => index !== removedIndex));
  };

  const handleCrawl = async () => {
    let success, err;
    try {
      setUiState({ isLoading: true });
      const response = await axios.post(`http://127.0.0.1:5000/web/add`, url);

      console.log("Search Results:", response.data);
      success = response.data;
      setUiState({ isLoading: false });
    } catch (error) {
      err = error;
      setUiState({ isLoading: false });
      console.error("Error performing search:", error);
    } finally {
      setUiState({ isLoading: false, success, error: err });
    }
  };
  return (
    <div className="w-screen">
      <div className="flex justify-start items-center align-middle space-x-4 ml-1">
        <h1 className="text-2xl font-bold">Nhập URL: </h1>
        <FormControl className="w-96" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">URL</InputLabel>
          <OutlinedInput
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
      </div>
      <Paper>
        {url?.map((link, index) => (
          <div key={index} className="flex items-center space-x-1">
            <h1>{link}</h1>
            <IconButton onClick={() => clearUrl(index)}>
              <ClearIcon />
            </IconButton>
          </div>
        ))}
      </Paper>
      {url?.length > 0 && (
        <Button className="flex" onClick={handleCrawl}>
          Crawl
        </Button>
      )}

      {uiState?.isLoading && <CircularProgress />}
      {uiState?.success && <Alert variant="outlined">{uiState?.success}</Alert>}
      {uiState?.error && <Alert variant="outlined">{uiState?.error}</Alert>}
    </div>
  );
};
export default WebCrawler;
