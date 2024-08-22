"use client";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <Container
      sx={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        gap: 3,
        height: "100vh",
        maxHeight: "100%",
      }}
    >
      <button
        className="w-1/2 h-[200px] rounded-xl text-xl font-bold text-white bg-sky-500 duration-300 hover:scale-105 hover:text-2xl shadow-xl"
        onClick={() => router.push("/search")}
      >
        SEARCH
      </button>
      <button
        className="w-1/2 h-[200px] rounded-xl text-xl font-bold text-white bg-green-400 duration-300 hover:scale-105 hover:text-2xl shadow-xl"
        onClick={() => router.push("/web-crawler")}
      >
        CRAWL
      </button>
    </Container>
  );
}
