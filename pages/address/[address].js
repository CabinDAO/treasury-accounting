import { useRouter } from "next/router";
import { ethers } from "ethers";
import fetch from "isomorphic-fetch";
import { H1, H2, H3, Box, Separator, PageLayout } from "components";
import { styled } from "@stitches/react";
import { utils } from "ethers";
import { tomato, grass } from "@radix-ui/colors";
const { parseEther, parseUnits, formatUnits } = utils;
import { useEthers, useEtherBalance, useTokenAllowance } from "@usedapp/core";

const formatAddress = (address) =>
  `${address.slice(0, 4)}...${address.slice(12, 16)}`;

const Row = styled("tr", {
  variants: {
    color: {
      red: {
        backgroundColor: tomato.tomato4,
        color: tomato.tomato11,
      },
      green: {
        backgroundColor: grass.grass4,
        color: grass.grass11,
      },
    },
  },
});

export default function WalletPage(props) {
  const router = useRouter();
  const address = router.query.address.toLowerCase();

  return (
    <PageLayout>
      <Box css={{ paddingTop: "2rem" }}>
        <H3
          css={{ margin: 0, textTransform: "uppercase", letterSpacing: 1 }}
          color="gray"
          size="sm"
        >
          Address:
        </H3>
        <H1 css={{ marginTop: 0 }}>{address}</H1>
        <Separator css={{ margin: "15px 0" }} />
        <H2 color="black">Summary</H2>

        <table>
          <thead>
            <tr>
              <th></th>
              <th>In</th>
              <th>Out</th>
            </tr>
          </thead>
          <tbody>
            {/* <Row>
              <th>Ether (E)</th>
              <td></td>
              <td></td>
            </Row> */}

            {Object.values(props.data.tokens).map((token, i) => {
              return (
                <Row key={i}>
                  <th>
                    {token.name} ({token.symbol})
                  </th>
                  <td>
                    {token.in}
                    {/* {formatUnits(token.in, token.decimals)} {token.symbol} */}
                  </td>
                  <td>
                    {token.out}
                    {/* {formatUnits(token.out, token.decimals)} {token.symbol} */}
                  </td>
                </Row>
              );
            })}
          </tbody>
        </table>

        <Separator css={{ margin: "15px 0" }} />
        <H2 color="black">Transactions</H2>
        <Box>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Token</th>
              </tr>
            </thead>
            <tbody>
              {props.data.transactions.map((tx, i) => {
                return (
                  <Row key={i} color={tx.to === address ? "green" : "red"}>
                    <td>
                      {new Intl.DateTimeFormat("en-us").format(
                        new Date(tx.timeStamp * 1000)
                      )}
                    </td>
                    <td>{formatAddress(tx.from)}</td>
                    <td>{formatAddress(tx.to)}</td>
                    <td>{tx.value}</td>
                    <td>
                      {tx.tokenName} ({tx.tokenSymbol})
                    </td>
                  </Row>
                );
              })}
            </tbody>
          </table>
        </Box>
      </Box>
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const address = context.query.address;
  const res = await fetch(
    `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=1000&startblock=0&endblock=27025780&sort=desc&apikey=HQX1Y71UNU91EY3FF7KSG9C792PHC9IF1K`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  const transactionData = data.result.reduce(
    (acc, tx) => {
      // set timestamp
      tx.timeStamp = tx.timeStamp * 1000;
      const txDate = new Date(tx.timeStamp);
      const txYear = txDate.getFullYear();
      const txMonth = txDate.getMonth();

      // add tx to list of all txs
      acc.transactions.push(tx);

      // add year and month objs to hist
      if (!acc.byDate[txYear]) acc.byDate[txYear] = {};
      if (!acc.byDate[txYear][txMonth]) acc.byDate[txYear][txMonth] = [];
      // and add tx to appropriate year/month
      acc.byDate[txYear][txMonth].push(tx);

      if (!acc.tokens[tx.tokenSymbol]) {
        acc.tokens[tx.tokenSymbol] = {
          name: tx.tokenName,
          symbol: tx.tokenSymbol,
          decimals: tx.tokenDecimal,
          contractAddress: tx.contractAddress,
          out: 0,
          in: 0,
        };
      }

      if (tx.to === address.toLowerCase()) {
        acc.tokens[tx.tokenSymbol].in += parseInt(tx.value);
      } else {
        acc.tokens[tx.tokenSymbol].out += parseInt(tx.value);
      }

      return acc;
    },
    { transactions: [], byDate: {}, tokens: {} }
  );

  return {
    props: {
      data: transactionData,
    },
  };
}
