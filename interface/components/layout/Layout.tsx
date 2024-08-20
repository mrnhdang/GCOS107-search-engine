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
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";

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
    <div>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
            onClick={() => router.push("/")}
          >
            <EngineeringOutlinedIcon className="w-10 h-10" />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            GROUP 2
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

      <Box sx={{ padding: "10px" }}>
        <Toolbar />
        {children}
      </Box>
    </div>
  );
};

export default Layout;
