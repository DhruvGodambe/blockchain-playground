import { BigNumber } from "ethers";
import { Interface, concat, hexlify } from "ethers/lib/utils";
import { getWalletClient } from "@wagmi/core";
import { encodeConstructorData } from "../utils/encodeConstructorData";
import { useReducer } from "react";
import { StateDispatch, TransactionReceipt } from "../types";
import { useEstimateGas, useSendTransaction } from 'wagmi'

export type DeployState = {
  data: null | TransactionReceipt;
  status: "idle" | "error" | "loading" | "success";
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  contractAddress: string | undefined;
  error: null | string;
};

interface ContractDeployArgs {
  abi: Interface;
  bytecode: string;
  sendTransaction: Function;
  args?: Array<string | number>;
  libraries?: Array<string>;
  value?: BigNumber;
  setContractAddress?: StateDispatch<string | null>;
  setStage?: StateDispatch<number>;
}
export function useContractDeploy(params: ContractDeployArgs) {
  const {
    abi,
    bytecode,
    args,
    libraries,
    value,
    sendTransaction,
  } = params;

  const constructorData = encodeConstructorData(abi, args, libraries);
  let txData: any;
  if (constructorData) {
    txData = hexlify(concat([bytecode, constructorData]));
  } else {
    txData = hexlify(concat([bytecode]));
  }

  // const estimateGas = useEstimateGas({
  //   data: txData,
  // })
  const rawTx: any = {
    data: txData,
    value,
  };

  async function handleContractDeployment() {
    // const signer = await getWalletClient();
    // if (signer) {
      const response = await sendTransaction(rawTx);
      return response;

      const obj: any = {
        contractAddress: "",
        receipt: {
            to: "",
            from: "",
            value: ""
        }
      }; 
      return obj; 
    // }
  }

  // function deployContract() {
  //   updateValues({ isError: false });
  //   handleContractDeployment()
  //     .then((tx) => {
  //       updateValues({ data: tx });
  //       updateValues({ contractAddress: tx?.contractAddress });
  //       if (setContractAddress && tx?.contractAddress) {
  //         setContractAddress(tx.contractAddress);
  //       }
  //       updateValues({ isSuccess: true });
  //       updateValues({ status: "success" });
  //       if (setStage) {
  //         setStage(1);
  //       }
  //     })
  //     .catch((e) => {
  //       updateValues({ isLoading: false });
  //       updateValues({ isError: true });
  //       updateValues({ status: "error" });
  //       updateValues({ error: e.message });
  //       if (e instanceof Error) {
  //         throw new Error(e.message);
  //       }
  //       console.error(e);
  //     });
  // }

  return { handleContractDeployment };
}