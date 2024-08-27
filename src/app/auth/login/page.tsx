"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="center" justify="center" height="100vh">
      <Box p={6} rounded="md" width="100%" maxWidth="400px" boxShadow="lg">
        <Heading as="h1" mb={6} textAlign="center">
          Sign In
        </Heading>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="password" mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={loading}
          >
            Sign In
          </Button>
        </form>
        <Text mt={4} textAlign="center">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup">
            <Button variant="link" colorScheme="blue">
              Sign Up
            </Button>
          </Link>
        </Text>
      </Box>
    </VStack>
  );
};

export default LoginPage;
