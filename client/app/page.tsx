"use client";
import { useState, useEffect } from "react";
import { useUser } from "./(globaContext)/UserContext";
import SignInForm from "@/components/SignInForm";

const Home = () => {
  // const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const { user, setUser } = useUser();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) setUser(null);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Set loading to false once check is done
  }, [setUser]);

  console.log(user);
  return (
    <main className="flex flex-col justify-center items-center gap-5 w-full min-h-screen">
      <SignInForm loading={loading} />
    </main>
  );
};
export default Home;
