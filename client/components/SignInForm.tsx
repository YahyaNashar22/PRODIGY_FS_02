"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/(globaContext)/UserContext";
import axios from "axios";

import { TextField, Button, Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const SignInForm = ({ loading }: { loading: boolean }) => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
        formData,
        { withCredentials: true }
      );
      const userData = response.data.payload.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/dashboard");
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/logout`, {
        withCredentials: true,
      })
      .then(() => {
        localStorage.removeItem("user");
        setUser(null);
      })
      .catch((error) => console.log(error));
  };

  if (loading) {
    return <Image src="/spinner.gif" alt="loader" width={240} height={240} />; // loading before checking the users
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        borderRadius: "16px",
        padding: "16px 32px",
        backgroundColor: "#fbfbfb",
      }}
    >
      {user && Object.keys(user).length != 0 ? (
        <>
          <Image
            src="/open_padlock.png"
            alt="open padlock"
            width="240"
            height="240"
          />
          <Typography
            variant="h6"
            gutterBottom
            className="text-center leading-loose"
          >
            Already signed in as{" "}
            <span className="italic text-blue-500">{user.username}</span>{" "}
          </Typography>
          <div className="flex justify-between items-center w-full">
            <Link
              href="/dashboard"
              className="inline-block px-8 transition-transform transform hover:scale-105 "
            >
              Go to dashboard
            </Link>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={handleLogout}
              disabled={isLoading}
            >
              Sign Out
            </Button>
          </div>
        </>
      ) : (
        <>
          {error && <Typography color="error">{error}</Typography>}
          <Image src="/padlock.png" alt="padlock" width="240" height="240" />
          <Typography
            variant="h4"
            gutterBottom
            className="text-center leading-loose"
          >
            Employee Management App
            <br />
            <span className="italic opacity-80 text-3xl"> Sign In </span>
          </Typography>

          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            label="Password"
            name="password"
            variant="outlined"
            type="password"
            fullWidth
            required
            margin="normal"
            onChange={handleChange}
          />
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          <Button
            variant="contained"
            type="submit"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            disabled={isLoading}
          >
            Sign In
          </Button>
        </>
      )}
    </Box>
  );
};

export default SignInForm;
