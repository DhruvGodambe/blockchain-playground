import { GlobalContext } from "@/src/context/GlobalContext";
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export function Siderbar() {
    const router = useRouter();
    const { selectedTab, setSelectedTab } = useContext(GlobalContext);

    return(
        <Box width={"20%"} background={"#363355"}>
          <Text
            mx={"auto"}
            my="10px"
            p="10px 0"
            textAlign={"center"}
            fontSize={"24px"}
            fontFamily={"cursive"}
            fontWeight={"bold"}
            color="white"
          >
            Blockchain Playground
          </Text>
          <Box
            color={"#63CEDD"}
            width={"80%"}
            mx="auto"
            fontSize={"16px"}
            mt="40px"
          >
            <Flex
              mt="10px"
              p="10px"
              borderRadius={"10px"}
              background={selectedTab == "ERC20" ? "#406CDB" : "inherit"}
              _hover={{ background: "#406CDB", color: "white", cursor: "pointer" }}
              alignItems={"center"}
              onClick={() => {
                router.push("/");
                setSelectedTab("ERC20");
              }}
            >
              <Box width={"20%"} textAlign={"center"} justifyContent={"center"} ml="10px">
                <Image src="./erc20_icon.png" />
              </Box>
              <Text color={ selectedTab == "ERC20" ? "white": "inherit"}>ERC20 Token</Text>
            </Flex>
            <Flex
              mt="10px"
              p="10px"
              borderRadius={"10px"}
              background={selectedTab == "ERC721" ? "#406CDB" : "inherit"}
              _hover={{ background: "#406CDB", color: "white", cursor: "pointer" }}
              alignItems={"center"}
              onClick={() => {
                router.push("/Erc721")
                setSelectedTab("ERC721");
              }}
            >
              <Box width={"20%"} textAlign={"center"} justifyContent={"center"} ml="10px">
                <Image src="./erc721_icon.png" />
              </Box>
              <Text color={ selectedTab == "ERC721" ? "white": "inherit"}>ERC721 Token</Text>
            </Flex>
            <Flex
              mt="10px"
              p="10px"
              borderRadius={"10px"}
              _hover={{ background: "#406CDB", color: "white" }}
              alignItems={"center"}
            >
              <Box width={"20%"} textAlign={"center"} justifyContent={"center"} ml="10px">
                <Image src="./staking_icon.png" />
              </Box>
              <Text color={ selectedTab == "staking" ? "white": "inherit"}>Staking</Text>
            </Flex>
            <Flex
              mt="10px"
              p="10px"
              borderRadius={"10px"}
              _hover={{ background: "#406CDB", color: "white" }}
              alignItems={"center"}
            >
              <Box width={"20%"} textAlign={"center"} justifyContent={"center"} ml="10px">
                <Image src="./airdrop_icon.png" />
              </Box>
              <Text color={ selectedTab == "airdrop" ? "white": "inherit"}>Airdrop</Text>
            </Flex>
          </Box>
        </Box>
    )
}