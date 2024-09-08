"use client";

import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "../(globaContext)/UserContext";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) setUser(null);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Set loading to false once check is done
  }, [setUser]);
  return (
    <main className="font-serif min-h-screen flex flex-col items-center justify-between">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
