import {
  Box,
  Button,
  Text,
  Image,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "../core/navbar";
import LaunchToken from "./launchToken";
import MintToken from "./mintToken";
import TransferToken from "./transferToken";
import { useRouter } from "next/router";
import { Siderbar } from "../core/sidebar";

const Home = () => {
  const [currentAction, setCurrentAction] = useState("");
  const router = useRouter();

  return (
    <Box background={"#25233B"}>
      <Flex minHeight={"100vh"}>
        <Siderbar/>
        <Box width={"80%"}>
          <Navbar title={"ERC721 Token"} />
          <Grid
            width={"90%"}
            mx="auto"
            templateColumns="repeat(3, 1fr)"
            gap={6}
            mt="10px"
          >
            <GridItem>
              <Box
                textAlign={"center"}
                p="10px 0"
                background={"#406CDB"}
                borderRadius={"10px"}
                alignItems={"center"}
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  setCurrentAction("Launch Token");
                }}
              >
                <Flex m="auto" width={"70%"} alignItems={"center"}>
                  <Box width={"50px"}>
                    <Image src="launch_token.png" />
                  </Box>
                  <Text width="70%" fontWeight={"bold"} fontSize={"14px"}>
                    Launch Token
                  </Text>
                </Flex>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                textAlign={"center"}
                p="10px 0"
                background={"#363355"}
                borderRadius={"10px"}
                border={"1px solid #445276"}
                color={"white"}
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  setCurrentAction("Mint Token");
                }}
              >
                <Flex m="auto" width={"70%"} alignItems={"center"}>
                  <Box width={"50px"}>
                    <Image src="mint_token.png" />
                  </Box>
                  <Text width="70%" fontWeight={"bold"} fontSize={"14px"}>
                    Mint Token
                  </Text>
                </Flex>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                textAlign={"center"}
                p="10px 0"
                background={"#363355"}
                borderRadius={"10px"}
                border={"1px solid #445276"}
                color={"white"}
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  setCurrentAction("Transfer Token");
                }}
              >
                <Flex m="auto" width={"70%"} alignItems={"center"}>
                  <Box width={"50px"}>
                    <Image src="transfer_token.png" />
                  </Box>
                  <Text width="70%" fontWeight={"bold"} fontSize={"14px"}>
                    Transfer ERC20 token
                  </Text>
                </Flex>
              </Box>
            </GridItem>
          </Grid>

          {currentAction == "Launch Token" ? (
            <LaunchToken setCurrentAction={setCurrentAction} />
          ) : currentAction == "Mint Token" ? (
            <MintToken setCurrentAction={setCurrentAction} />
          ) : currentAction == "Transfer Token" ? (
            <TransferToken setCurrentAction={setCurrentAction} />
          ) : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
