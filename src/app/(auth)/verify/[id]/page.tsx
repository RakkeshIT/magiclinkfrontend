"use client";
import { coreAPI } from "@/utils/coreAPI";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Varify = () => {
  const router = useRouter();
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    const verifyAuth = async () => {
      try {
        const res = await coreAPI.get(`/verify/${id}`);
        const data = res.data
        console.log("Response from verification API:", res);

        if (!data.accessToken) {
          console.log("Access Not Did not come");
          
          router.push("/user-auth");
        }

        if (!data.success || !data.accessToken) {
          router.push("/user-auth");
          return;
        }

        // // If verification is successful, redirect to dashboard
        // // ✅ STORE IN LOCALSTORAGE (not cookie)
        localStorage.setItem('auth_token', data.accessToken);
        console.log("Token stored in localStorage");
        const cookieRes = await axios.post('/api/auth/set-cookies', { accessToken: data.accessToken });
        console.log("Cookie API Response: ", cookieRes.data);

        // // check cookie was set
        // console.log("Document cookie: ", document.cookie);
        // console.log("Auth Token: ", document.cookie.includes("auth_token"));
        
          
        router.push("/dashboard");
      } catch (error) {
        console.log("Verification failed:", error);
        router.push("/user-auth");
      }
    };
    verifyAuth();
  }, [id, router]);
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
          <p className="text-sm text-gray-600">Signing you in securely…</p>
        </div>
      </div>
    </>
  );
};

export default Varify;
