"use client";
import LiquidEther from "../components/LiquidEther";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        height: 600,
        position: "relative",
        background: "#000000",
      }}
    >
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
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
          Welcome to MagicLink
        </h1>
        <p style={{ fontSize: "24px" }}>
          Experience the future of authentication
        </p>
        <button
          onClick={() => router.push("/user-auth")}
          className="
    relative mt-5 px-12 py-2 rounded-xl
    border border-white/30
    bg-white/10 backdrop-blur-md
    text-white font-medium
    overflow-hidden
    transition-all duration-300

    hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]
    hover:bg-white/15

    focus-visible:outline-none
    focus-visible:ring-4
    focus-visible:ring-white/30

    cursor-pointer
  "
        >
          Click to Auth
          {/* Wave Effect */}
          <span
            className="
      pointer-events-none absolute inset-0
      bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent_60%)]
      opacity-0 scale-75
      transition-all duration-700
      group-focus-visible:opacity-100
      group-focus-visible:scale-150
    "
          />
        </button>
      </Box>
    </div>
  );
}
