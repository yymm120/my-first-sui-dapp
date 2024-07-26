import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { isValidSuiObjectId } from "@mysten/sui/utils";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { useState } from "react";
import { Counter } from "./Counter";
// import { WalletStatus } from "./WalletStatus";
import { CreateCounter } from "./CreateCounter";

function App() {
  const currentAccount = useCurrentAccount();
  console.debug("currentAccount is ", currentAccount);
  const [counterId, setCounter] = useState(() => {
    const hash = window.location.hash.slice(1);
    return isValidSuiObjectId(hash) ? hash : null
  });

  console.debug("counterId is ", counterId);

  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>dApp Starter Template</Heading>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500 }}
        >
          {/* <WalletStatus /> */}
          {currentAccount ? (counterId ? (<Counter id={counterId}></Counter>) : (<CreateCounter onCreated={(id) => {
            window.location.hash = id;
            setCounter(id);
          }}></CreateCounter>)) : (
            <Heading>Please connect your wallet!</Heading>
          )}
        </Container>
      </Container>
    </>
  );
}

export default App;
