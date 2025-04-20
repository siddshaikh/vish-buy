"use client";

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "@/firebase/firebaseConfig";
import { Avatar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

const User = ({ isAuthenticate }) => {
  const [userName, setUserName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email || "User");
      } else {
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAvatarClick = (event) => {
    if (userName) {
      setAnchorEl(event.currentTarget);
    } else {
      router.push("/login");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    setAnchorEl(null);
    router.push("/login");
  };

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "S";

  return (
    <>
      {isAuthenticate ? (
        <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
          <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
            {firstLetter}
          </Avatar>
        </IconButton>
      ) : (
        <Button
          size="small"
          variant="outlined"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      )}

      {userName && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
        </Menu>
      )}
    </>
  );
};

export default User;
