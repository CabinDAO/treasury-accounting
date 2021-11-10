import { styled } from "@stitches/react";
import { gray, grass } from "@radix-ui/colors";

export const Text = styled("div", {
  lineHeight: "20px",
  fontWeight: "normal",
  variants: {
    type: {
      accent: {
        fontFamily: "IBM Plex Mono",
      },
      bold: {
        fontWeight: 500,
      },
    },
    color: {
      black: {
        color: gray.gray12,
      },
      green: {
        color: grass.grass11,
      },
    },
    size: {
      sm: {
        fontSize: 14,
      },
      md: {
        fontSize: 16,
      },
      lg: {
        fontSize: 22,
      },
      xl: {
        fontSize: 28,
      },
    },
  },
  defaultVariants: {
    color: "black",
    size: "md",
  },
});
