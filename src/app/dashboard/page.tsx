"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import DotGrid from "../../components/DotGrid";
import axios from "axios";
import DashboardLayout from "@/components/Dashboard";

const Dashboard = () => {
   // Dynamic Title
   useEffect(() => {
    document.title = "Your Dashboard"
  }, [])
  
  const router = useRouter();

  const Logout = async () => {
    localStorage.removeItem('auth_token')
    await axios.delete("/api/auth/logout");
    router.push("/user-auth");
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080a0f] overflow-hidden">

      {/* ── DotGrid — faded background layer ── */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
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
      </div>

      {/* ── Content layer — sits above the dots ── */}
      <div className="relative z-10">
        <DashboardLayout Logout={Logout} />
      </div>

    </div>
  );
};

export default Dashboard;