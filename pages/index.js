import { useState } from "react";
import { styled } from "@stitches/react";
import { gray, grass } from "@radix-ui/colors";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { H1, Text, Container, Box, Separator } from "components";

const Hero = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: grass.grass12,
  color: "white",
});

const SearchInput = styled("input", {
  minWidth: 400,
  padding: "0.5rem 0.75rem",
  border: "none",
});

const SearchButton = styled("button", {
  padding: "0.5rem 1.75rem",
  minWidth: "4rem",
  border: "none",
});

export default function Home() {
  const [address, setAddress] = useState("");

  return (
    <div>
      <Hero>
        <Container>
          <H1 color="white" size="2xl">
            Wallet Accounting
          </H1>
          <Text color="white" size="lg">
            Basic P&L and Breakeven for Ethereum wallet addresses
          </Text>
          <Separator css={{ margin: "2rem 0 1rem" }} />
          <Box>
            <SearchInput
              type="text"
              name="Wallet Address"
              id="wallet-address"
              value={address}
              placeholder="0x... | .eth"
              onChange={(e) => setAddress(e.target.value)}
            />
            <Link disabled={address.length === 16} href={`/address/${address}`}>
              <SearchButton>Go</SearchButton>
            </Link>
          </Box>
        </Container>
      </Hero>
    </div>
  );
}
