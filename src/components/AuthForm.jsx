"use client";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button, TextField, Typography, Box, Stack } from "@mui/material";
import app from "@/firebase/firebaseConfig";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function AuthForm({ type }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLogin = type === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5" mb={3}>
        {isLogin ? "Login to your account" : "Create an account"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            fullWidth
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            fullWidth
          />
          <Button variant="contained" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
          <Button variant="outlined" onClick={handleGoogle}>
            Continue with Google
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
