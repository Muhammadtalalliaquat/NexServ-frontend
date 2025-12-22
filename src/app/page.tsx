"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

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

    if (!token) {
      router.push("/get-started");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // 🔹 Token expired
      if (decoded.exp < currentTime) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/get-started");
        return;
      }
    } catch (err) {
      console.log(err, "here");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/get-started");
      return;
    }

    if (user?.isAdmin) {
      router.push("/add-service");
    } else {
      router.push("/home");
    }
  }, [router]);

  return;
}
