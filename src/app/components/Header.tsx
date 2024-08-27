"use client";

import {
  Flex,
  ButtonGroup,
  Button,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuth } from "../contexts/AuthContext";
import PokemonLogo from "../../../public/pokemon-logo.png"; // Adjust the path to your logo file

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const displayMenu = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      as="header"
      p={4}
      bg="black"
      color="white"
      align="center"
      position="relative"
    >
      {isAuthenticated && (
        <Text mr={4}>Hello {`${user?.firstName} ${user?.lastName}`}!</Text>
      )}
      <Spacer />

      <Box position="absolute" left="50%" transform="translateX(-50%)">
        <Link href="/">
          <Image
            src={PokemonLogo}
            alt="Pokemon TCG App"
            width={120}
            height={40}
          />
        </Link>
      </Box>
      <Spacer />
      {isAuthenticated &&
        (displayMenu ? (
          <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon />} />
            <MenuList color={"black"}>
              <MenuItem>
                Hello {`${user?.firstName} ${user?.lastName}`}!
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <ButtonGroup>
            <Button colorScheme="red" onClick={logout}>
              Logout
            </Button>
          </ButtonGroup>
        ))}
    </Flex>
  );
};

export default Header;
