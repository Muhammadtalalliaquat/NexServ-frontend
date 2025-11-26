"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
// import Image from "next/image";

interface DecodedToken {
  exp: number;
}

type User = {
  isAdmin: boolean;
  token?: string;
};

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    const user: User | null = storedData ? JSON.parse(storedData) : null;
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("user");
          // router.push("/get-started");
          console.log(decoded, "here");
          return;
        }
      } catch (error) {
        localStorage.removeItem("user");
        // router.push("/get-started");
        console.log(error, "here");
      }
    }
    if (user?.isAdmin === true) {
      router.push("/add-service");
    } else if (user) {
      router.push("/Home");
    } 
    // else {
    //   router.push("/get-started");
    // }
  }, [router]);

  return;
}
