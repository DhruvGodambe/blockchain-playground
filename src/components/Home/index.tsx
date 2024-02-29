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
import Navbar from "./navbar";
import LaunchToken from "./launchToken";
import MintToken from "./mintToken";
import TransferToken from "./transferToken";

const Home = () => {
  const [currentAction, setCurrentAction] = useState("");

  return (
    <Box background={"#25233B"}>
      <Flex minHeight={"100vh"}>
        <Box width={"20%"} background={"#63CEDD"} display={"none"}>
          <Text
            mx={"auto"}
            my="10px"
            textAlign={"center"}
            fontSize={"24px"}
            fontFamily={"cursive"}
            fontWeight={"bold"}
            color="white"
          >
            Blockchain Playground
          </Text>
          <Box width={"80%"} mx="auto" fontSize={"20px"} mt="40px">
            <Text mt="10px">ERC20 Token</Text>
            <Text mt="10px">ERC721 Token</Text>
            <Text mt="10px">Staking</Text>
          </Box>
        </Box>
        <Box width={"100%"}>
          <Navbar />

          <Text
            width={"90%"}
            fontSize={"24px"}
            mx="auto"
            mt="50px"
            color="white"
          >
            ERC20 Token
          </Text>
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
                background={"#63CEDD"}
                borderRadius={"10px"}
                height={"100px"}
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  setCurrentAction("Launch Token");
                }}
              >
                <Flex m="auto" width={"70%"} alignItems={"center"}>
                  <Box width={"30%"}>
                    <Image src="launch_token.png" />
                  </Box>
                  <Text width="70%" fontWeight={"bold"}>
                    Launch ERC20 token
                  </Text>
                </Flex>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                textAlign={"center"}
                p="10px 0"
                background={"#63CEDD"}
                borderRadius={"10px"}
                height={"100px"}
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  setCurrentAction("Mint Token");
                }}
              >
                <Flex m="auto" width={"70%"} alignItems={"center"}>
                  <Box width={"30%"}>
                    <Image src="mint_token.png" />
                  </Box>
                  <Text width="70%" fontWeight={"bold"}>
                    Mint ERC20 token
                  </Text>
                </Flex>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                textAlign={"center"}
                p="10px 0"
                background={"#63CEDD"}
                borderRadius={"10px"}
                height={"100px"}
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  setCurrentAction("Transfer Token");
                }}
              >
                <Flex m="auto" width={"70%"} alignItems={"center"}>
                  <Box width={"30%"}>
                    <Image src="transfer_token.png" />
                  </Box>
                  <Text width="70%" fontWeight={"bold"}>
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
