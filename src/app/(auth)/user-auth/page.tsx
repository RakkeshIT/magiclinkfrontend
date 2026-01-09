"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Logo from "../../../../public/logo.png";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { coreAPI } from "../../../utils/coreAPI";
import { Dialog } from "@/components/Dialog";

const UserAuth = () => {
  const [email, setEmail] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await coreAPI.post("/login", { email });
      setShowDialog(true);

    } catch (error) {
      console.log(error);
    } finally {
      setShowDialog(false);
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#fafafa",
      }}
    >

      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          backgroundColor: "rgba(255, 255, 255, 0.15)", // semi-transparent
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",

          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.3)",

          // Shadows
          boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.5),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1),
      inset 0 0 20px 10px rgba(255, 255, 255, 0.1)
    `,
        }}
      >
        {/* Logo / Brand */}
        <Typography
          variant="h6"
          fontWeight={700}
          color="text.primary"
          sx={{ alignSelf: "center" }}
        >
          <Image alt="Logo" src={Logo} height={70} width={70} />
        </Typography>

        {/* Title */}
        <Typography variant="h5" fontWeight={600} textAlign="center">
          Authenticate with Magic Link
        </Typography>

        {/* Subtitle */}
        <Typography variant="body2" textAlign="center" color="text.secondary">
          Enter your email to receive a secure login link
        </Typography>

        {/* Email Field */}
        <TextField
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />

        {/* CTA */}
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          sx={{
            mt: 1,
            py: 1.2,
            borderRadius: 1,
            textTransform: "none",
            fontWeight: 500,
          }}
          onClick={handleSubmit}
        >
          Continue
        </Button>

        {/* Helper text */}
        <Typography variant="caption" textAlign="center" color="text.secondary">
          We’ll email you a one-time login link. No password required.
        </Typography>
        <Divider>
          <Box
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              px: 2,
              bgcolor: "#fafafa",
            }}
          >
            OR
          </Box>
        </Divider>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button variant="outlined">Google</Button>
          <Button variant="outlined">Phone Number</Button>
        </Box>
      </Box>

            {showDialog && (
        <Dialog name="Mail Sent" title="Please Check Your Mail Id" />
      )}
    </Box>
  );
};

export default UserAuth;
