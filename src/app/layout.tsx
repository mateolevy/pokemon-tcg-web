import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import { Metadata } from "next";
import { AuthProvider } from "./contexts/AuthContext";

export const metadata: Metadata = {
  title: "Pokemon TGC App",
  description: "Simulate Pokemon TGC battles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
