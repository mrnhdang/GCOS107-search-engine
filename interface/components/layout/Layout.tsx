"use client";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  children?: any;
};

const navItems = [
  { label: "Search", url: "/search" },
  { label: "Web Crawler", url: "/web-crawler" },
];

const Layout = ({ children }: Props) => {
  const router = useRouter();
  return (
    <Container>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            Group 2
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            group 2
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "#fff" }}
                onClick={() => router.push(item.url)}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Box>
        <Toolbar />
        {children}
      </Box>
    </Container>
  );
};

export default Layout;
