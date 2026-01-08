"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DotGrid from "../../components/DotGrid";
import axios from "axios";
import {LogOut} from 'lucide-react'
const Dashboard = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter()

  const Logout = async() => {
    await axios.post('http://localhost:5000/logout', {}, {withCredentials: true})
    router.push('/user-auth')
  }
  
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          height: 600,
          position: "relative",
          background: "#000000",
        }}
      >
        <DotGrid
          dotSize={2}
          gap={15}
          baseColor="#5227FF"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#FFFFFF",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
            Welcome to Your Dashboard
          </h1>
          <p style={{ fontSize: "24px" }}>
            Experience the future of authentication
          </p>
          <button onClick={Logout} className="cursor-pointer">
             <LogOut/>
          </button>
          
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
