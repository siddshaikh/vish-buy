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
import {
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  IconButton,
  InputAdornment,
  Link as MuiLink,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import app from "@/firebase/firebaseConfig";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function AuthForm({ type }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <Box
      maxWidth={400}
      mx="auto"
      mt={10}
      px={2}
      py={4}
      border={1}
      borderColor="grey.300"
      borderRadius={2}
      boxShadow={3}
    >
      <Typography variant="h5" mb={3} textAlign="center">
        {isLogin ? "Login to your account" : "Create an account"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" fullWidth>
            {isLogin ? "Login" : "Sign Up"}
          </Button>
          <Button variant="outlined" fullWidth onClick={handleGoogle}>
            Continue with Google
          </Button>
          <Typography variant="body2" textAlign="center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <MuiLink
              component={Link}
              href={isLogin ? "/signup" : "/login"}
              underline="hover"
            >
              {isLogin ? "Sign Up" : "Login"}
            </MuiLink>
          </Typography>
        </Stack>
      </form>
    </Box>
  );
}
