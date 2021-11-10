import React from "react";
import Link from "next/link";
import { styled } from "@stitches/react";
import { Container, Text, Separator } from "components";

const Box = styled("div", {});
const A = styled("a", {
  cursor: "pointer",
});

export default function PageHeader() {
  return (
    <Box css={{ width: "100%" }}>
      <Container css={{ marginTop: 15 }}>
        <Link href="/">
          <A css={{ textDecoration: "none" }}>
            <Text color="green" type="bold">
              Wallet Account
            </Text>
          </A>
        </Link>
        <Text>Basic accounting tools for your wallet.</Text>
      </Container>
      <Separator css={{ margin: "15px 0" }} />
    </Box>
  );
}
