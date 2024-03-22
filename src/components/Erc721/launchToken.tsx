import { useContractDeploy } from "@/src/hooks/useContractDeploy";
import { Box, Button, Flex, Input, Text, Image } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import TokenTemplate from "../../utils/TokenTemplate.json";
import { useAccount, useSendTransaction } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { config } from "./config";
import { sepolia } from "wagmi/chains";
import Link from "next/link";
import { GlobalContext } from "@/src/context/GlobalContext";

export default function LaunchToken({ setCurrentAction }: any) {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");
  const [receiptHash, setReceiptHash] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [txStatus, setTxStatus] = useState("Not initiated");
  const {setTokenAddress} = useContext(GlobalContext);
  
  const { isConnected, address } = useAccount();
  const { sendTransaction } = useSendTransaction({
    mutation: {
      onSuccess(data, variables, context) {
        console.log(data);
        setTxStatus("pending");
        setReceiptHash(data);
      },
    },
  });

  useEffect(() => {
    if(receiptHash !== "") {
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
    let address = receipt?.logs[0]?.address;
    if(address) {
      setContractAddress(address);
      setTokenAddress(address);
    }
  };

  const handleDeployToken = async () => {
    const supply = tokenSupply.toString() + "0".repeat(18);

    //prepare deployment of ERC20
    const deploymentConfig: any = {
      abi: TokenTemplate.abi,
      bytecode: TokenTemplate.bytecode,
      args: [tokenName, tokenSymbol, supply],
      libraries: [],
      value: 0,
      setContractAddress,
      sendTransaction,
    };

    //deploy
    if(isConnected) {
      const { handleContractDeployment } = useContractDeploy(deploymentConfig);
      const resp = await handleContractDeployment();
      console.log(resp);
    } else {
      alert("Wallet not connected!");
    }
  };

  return (
    <Flex m="40px auto" width={"70%"}>
      <Box
        p="10px 20px"
        width={"60%"}
        mr="5%"
        background={"#63CEDD"}
        borderRadius={"10px"}
      >
        <Box mt="20px">
          <Text>Token Name:</Text>
          <Input
            placeholder="Enter token name"
            value={tokenName}
            onChange={(e: any) => {
              setTokenName(e.target.value);
            }}
          />
        </Box>
        <Box mt="20px">
          <Text>Token Symbol:</Text>
          <Input
            placeholder="Enter token symbol"
            value={tokenSymbol}
            onChange={(e: any) => {
              setTokenSymbol(e.target.value);
            }}
          />
        </Box>
        <Box mt="20px">
          <Text>Supply:</Text>
          <Input
            placeholder="Enter token name"
            type="number"
            value={tokenSupply}
            onChange={(e: any) => {
              setTokenSupply(e.target.value);
            }}
          />
        </Box>

        <Flex justifyContent={"flex-end"} mt="20px">
          <Button
            my="10px"
            ml="10px"
            onClick={() => {
              setCurrentAction("");
            }}
          >
            Cancel
          </Button>
          <Button
            my="10px"
            ml="10px"
            onClick={handleDeployToken}
            background={"#2797FF"}
          >
            Launch
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
              mt="30px "
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
            <Text fontWeight={"bold"}>Contract Address:</Text>
            <Text>{contractAddress}</Text>

            <Text fontWeight={"bold"} mt="30px">Transaction URL:</Text>
            <Link href={`https://sepolia.etherscan.io/tx/${receiptHash}`} target="_blank">https://sepolia.etherscan.io/tx/{receiptHash}</Link>
          </Box>
        ) : null}
      </Box>
    </Flex>
  );
}
