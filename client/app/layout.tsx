"use client";
import "./globals.css";

import { UserProvider } from "./(globaContext)/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-serif">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
