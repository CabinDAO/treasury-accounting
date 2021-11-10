import { ChainId, DAppProvider } from "@usedapp/core";

import { globalCss } from "../stitches.config.js";

const globalStyles = globalCss({
  "@import":
    "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
  "@font-face": {
    fontFamily: "IBM Plex Mono",
    src: "local(IBM Plex Mono)",
  },
  "@font-face": {
    fontFamily: "Poppins",
    src: "local(Poppins)",
  },
  "*": {},
  body: {
    fontFamily: "Poppins",
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#333",
    fontWeight: "400",
    margin: 0,
    padding: 0,
  },
});

const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]:
      "https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934",
  },
};

function MyApp({ Component, pageProps }) {
  globalStyles();

  return (
    <DAppProvider config={config}>
      <Component {...pageProps} />
    </DAppProvider>
  );
}

export default MyApp;
