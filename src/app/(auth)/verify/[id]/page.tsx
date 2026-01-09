"use client";
import { coreAPI } from "@/utils/coreAPI";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Varify = () => {
  const router = useRouter();
  const { id } = useParams();
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await coreAPI.get(`/verify/${id}`);
        if (res.status !== 201) {
          router.push("/user-auth");
        } else {
          router.push("/dashboard"); 
        }
      } catch (error) {
        console.log("Verification failed:", error);
        router.push("/user-auth");
      }
    };
    verifyAuth();
  }, []);
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
