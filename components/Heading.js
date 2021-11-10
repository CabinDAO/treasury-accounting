import { styled } from "@stitches/react";
import { gray, grass } from "@radix-ui/colors";

const baseStyles = {
  fontWeight: 500,
  marginTop: "1rem",
  marginBottom: "1rem",
  variants: {
    color: {
      black: {
        color: gray.gray12,
      },
      gray: {
        color: gray.gray11,
      },
      green: {
        color: grass.grass11,
      },
    },
    size: {
      sm: {
        fontSize: "0.875rem",
      },
      md: {
        fontSize: "1rem",
      },
      lg: {
        fontSize: "1.125rem",
      },
      xl: {
        fontSize: "1.25rem",
      },
      "2xl": {
        fontSize: "1.5rem",
      },
    },
  },
};

export const H1 = styled("h1", {
  ...baseStyles,
  defaultVariants: {
    color: "green",
    size: "xl",
  },
});

export const H2 = styled("h2", {
  ...baseStyles,
  defaultVariants: {
    color: "green",
    size: "lg",
  },
});

export const H3 = styled("h3", {
  ...baseStyles,
  defaultVariants: {
    color: "green",
    size: "md",
  },
});
