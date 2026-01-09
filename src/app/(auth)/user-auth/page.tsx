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
import { SpinnerCustom } from "@/components/ui/spinner";
import { title } from "process";

const UserAuth = () => {
  const [email, setEmail] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailDialog, setEmailDialog] = useState({
    isOpen: false,
    name: "Mail Sent",
    title: "Please Check Your Mail Id",
  });
  const [button, setButton] = useState({
    isOpen: false,
    name: "Feature Coming Soon",
    title: "This feature is under development",
  });
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await coreAPI.post("/login", { email });
      if (res.status === 201) {
        setEmailDialog((prev) => ({...prev, isOpen: true}))
        setShowDialog(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const showButtonDialog = () => {
    setButton((prev) => ({...prev, isOpen: true}))
    setShowDialog(true);
  };
  return (
    <>
      {loading && (
        <SpinnerCustom className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />
      )}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#fafafa",
          opacity: loading ? 0.1 : 1,
          transition: "opacity 0.3s ease-in-out",
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
            pointerEvents: loading ? "none" : "auto",
          }}
          aria-busy={loading ? "true" : "false"}
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
          <Typography
            variant="caption"
            textAlign="center"
            color="text.secondary"
          >
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
            <Button variant="outlined" onClick={showButtonDialog}>
              Google
            </Button>
            <Button variant="outlined" onClick={showButtonDialog}>
              Phone Number
            </Button>
          </Box>
        </Box>

        {showDialog && (
          <Dialog
            name={emailDialog.isOpen ? emailDialog.name : button.name}
            title={emailDialog.isOpen ? emailDialog.title : button.title}
            open={showDialog}
            openChange={setShowDialog}
          />
        )}
      </Box>
    </>
  );
};

export default UserAuth;
