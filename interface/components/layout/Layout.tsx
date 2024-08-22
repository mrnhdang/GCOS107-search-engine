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
import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();

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
            <Button
              variant="outlined"
              className="shadow-xl bg-sky-500 text-white font-bold w-[100px]"
              onClick={() => router.push("/search")}
              hidden={pathname === "/" || pathname === "/search"}
            >
              SEARCH
            </Button>
            <Button
              variant="outlined"
              className="shadow-xl bg-green-400 text-white font-bold w-[100px]"
              onClick={() => router.push("/web-crawler")}
              hidden={pathname === "/" || pathname === "/web-crawler"}
            >
              CRAWL
            </Button>
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
