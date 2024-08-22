// app/components/Header.tsx
import { Flex, Heading, Spacer, ButtonGroup, Button } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  return (
    <Flex as="header" p={4} bg="green.500" color="white" align="center">
      <Link href={"/"}>
        <Heading size="md">Pokemon TCG App</Heading>
      </Link>
      <Spacer />
      <ButtonGroup>
        <Button>Login</Button>
        <Button>Sign Up</Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Header;
