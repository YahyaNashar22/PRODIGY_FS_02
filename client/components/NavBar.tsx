"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/app/(globaContext)/UserContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const NavBar = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/logout`, {
        withCredentials: true,
      })
      .then(() => {
        localStorage.removeItem("user");
        setUser(null);
        router.push("/");
      })
      .catch((error) => console.log(error));
  };

  const handleClickOpen = () => {
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal without logging out
  };

  const confirmLogout = () => {
    handleLogout(); // Call the logout function
    handleClose(); // Close the modal after logging out
  };

  return (
    <nav className="self-center flex items-center justify-between gap-4">
      <p>Welcome back {user?.username}</p>

      <Button
        variant="contained"
        onClick={handleClickOpen}
        className="font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Sign out
      </Button>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={confirmLogout}
            sx={{
              color: "#ff0000dd",
            }}
            autoFocus
          >
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </nav>
  );
};

export default NavBar;
