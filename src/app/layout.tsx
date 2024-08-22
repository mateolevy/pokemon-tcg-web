import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import { Metadata } from "next";

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
          <Header />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
