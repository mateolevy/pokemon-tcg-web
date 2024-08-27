"use client";
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Custom colors for Pokémon
const colors = {
  brand: {
    50: "#f5f0ff",
    100: "#d7c7f5",
    200: "#b99feb",
    300: "#9b77e1",
    400: "#7e4fd7",
    500: "#6536be", // Primary purple (Pokémon theme)
    600: "#4d2a94",
    700: "#351f6b",
    800: "#1e1241",
    900: "#080519",
  },
};

// Theme configuration
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Custom Chakra theme
const theme = extendTheme({
  colors,
  config,
  components: {
    Button: {
      baseStyle: {
        borderRadius: "md",
        fontWeight: "bold",
      },
      sizes: {
        sm: {
          fontSize: "sm",
          px: 4,
          py: 3,
        },
        md: {
          fontSize: "md",
          px: 6,
          py: 4,
        },
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
        },
        outline: {
          borderColor: "brand.500",
          color: "brand.500",
          _hover: {
            bg: "brand.500",
            color: "brand.700",
          },
        },
      },
    },
  },
});

export default theme;
