// app/components/Header.tsx
"use client"; // Ensure this is at the top for client-side usage

import {
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <Flex as="header" p={4} bg="green.500" color="white" align="center">
      <Link href="/">
        <Heading size="md">Pokemon TCG App</Heading>
      </Link>
      <Spacer />
      {isAuthenticated ? (
        <ButtonGroup alignItems="center">
          <Text mr={4}>{`${user?.firstName} ${user?.lastName}`}</Text>
          <Button colorScheme="red" onClick={logout}>
            Logout
          </Button>
        </ButtonGroup>
      ) : null}
    </Flex>
  );
};

export default Header;
