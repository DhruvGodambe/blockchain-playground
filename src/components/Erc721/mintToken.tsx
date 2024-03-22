import { Box, Button, Flex, Input, Text, Image } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import TokenTemplate from "../../utils/TokenTemplate.json";
import { useAccount } from "wagmi";
import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "./config";
import { sepolia } from "@wagmi/core/chains";
import Link from "next/link";
import { GlobalContext } from "@/src/context/GlobalContext";

export default function MintToken({ setCurrentAction }: any) {
  const contract_address = "0x4cee8d36d1eBDF35914894AcB871B9b889c779E4";
  const {tokenAddress, setTokenAddress} = useContext(GlobalContext);

  const [tokenSupply, setTokenSupply] = useState(0);
  const [receiptHash, setReceiptHash] = useState("");
  const [txStatus, setTxStatus] = useState("Not initiated");

  const { isConnected } = useAccount();
  const { writeContract } = useWriteContract({
    mutation: {
      onSuccess(data, variables, context) {
        console.log("Success");
        setReceiptHash(data);
        console.log({ data, variables, context });
      },

      onSettled(data: any) {
        setReceiptHash(data);
      },

      onError(error, variables, context) {
        console.log("Error");
        console.log({ error, variables, context });
        setTxStatus("Failed");
      },
    },
  });

  useEffect(() => {
    if (receiptHash && receiptHash !== "") {
      console.log(receiptHash);
      getTxReceipt(receiptHash);
    }
  }, [receiptHash]);

  const getTxReceipt = async (hash: any) => {
    setTxStatus("Pending");
    const receipt = await waitForTransactionReceipt(config, {
      hash,
      chainId: sepolia.id,
    });

    setTxStatus("Success");
    console.log(receipt);
  };

  const handleMintToken = async () => {
    const supply = tokenSupply.toString() + "0".repeat(18);
    if (isConnected) {
      writeContract({
        abi: TokenTemplate.abi,
        address: tokenAddress !== "" ? tokenAddress : contract_address,
        functionName: "mint",
        args: [supply],
      });
    } else {
      alert("wallet not connected");
    }
  };

  return (
    <Flex m="40px auto" width={"70%"} alignItems={"flex-start"}>
      <Box
        p="10px 20px"
        width={"60%"}
        mr="5%"
        background={"#63CEDD"}
        borderRadius={"10px"}
      >
        {tokenAddress == "" && (
          <Box textAlign={"left"} mb="20px">
            <Text>Token Name: Toeken 1</Text>
            <Text>Address: 0x4cee8d36d1eBDF35914894AcB871B9b889c779E4</Text>
            <Text>Network: Ethereum Sepolia</Text>
          </Box>
        )}
        <Box textAlign={"left"}>
          <Text>Token Address: </Text>
          <Input
            placeholder="Enter contract address"
            value={tokenAddress}
            onChange={(e: any) => {
              setTokenAddress(e.target.value);
            }}
          />
        </Box>
        <Box textAlign={"left"}>
          <Text>Mint amount: </Text>
          <Input
            placeholder="Enter amount"
            type="number"
            value={tokenSupply}
            onChange={(e: any) => {
              setTokenSupply(parseInt(e.target.value));
            }}
          />
        </Box>
        <Flex justifyContent={"flex-end"}>
          <Button
            my="10px"
            ml="10px"
            onClick={() => {
              setCurrentAction("");
              setTokenAddress(contract_address);
              setTokenSupply(0);
            }}
          >
            Cancel
          </Button>
          <Button
            my="10px"
            ml="10px"
            background={"#2797FF"}
            onClick={handleMintToken}
          >
            Mint
          </Button>
        </Flex>
      </Box>
      <Box width={"35%"}>
        {txStatus == "Not initiated" ? (
          <Box background={"white"} p="20px" borderRadius={"10px"}>
            <Text fontWeight={"bold"}>Transaction Status:</Text>
            <Text>Not initiated</Text>
            <Image
              width={"100%"}
              mx="auto"
              mt="30px"
              src="https://cdn.dribbble.com/users/2514124/screenshots/5474610/crypto6_3.gif"
            />
          </Box>
        ) : txStatus == "Pending" ? (
          <Box background={"white"} p="20px" borderRadius={"10px"}>
            <Text fontWeight={"bold"}>Transaction Status:</Text>
            <Text>Pending</Text>
            <Image
              width={"100%"}
              mx="auto"
              mt="30px "
              src="https://cdn.dribbble.com/users/1813781/screenshots/5597337/dribbble-girl-with-clock.gif"
            />
          </Box>
        ) : txStatus == "Success" ? (
          <Box background={"white"} p="20px" borderRadius={"10px"}>
            <Text fontWeight={"bold"}>Transaction Status:</Text>
            <Text>Success</Text>
            <Image
              width={"100%"}
              mx="auto"
              mt="30px"
              src="https://cdn.dribbble.com/users/911154/screenshots/3332845/vfmov3.gif"
            />
            <Text fontWeight={"bold"}>Transaction URL:</Text>
            <Link
              href={`https://sepolia.etherscan.io/tx/${receiptHash}`}
              target="_blank"
            >
              https://sepolia.etherscan.io/tx/{receiptHash}
            </Link>
          </Box>
        ) : null}
      </Box>
    </Flex>
  );
}
