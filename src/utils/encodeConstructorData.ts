import { Interface, hexZeroPad, AbiCoder } from "ethers/lib/utils";

export function encodeConstructorData(
  abi: any,
  args?: Array<string | number>,
  libraries?: Array<string>
) {
  if (libraries) {
    for (let i = 0; i < libraries.length; i++) {
      libraries[i] = hexZeroPad(libraries[i], 20);
    }
  }

  let constructorData;
  if (args) {
    let constructorArgs: any;
    abi.forEach((method: any) => {
      if(method?.type == "constructor") {
        constructorArgs = method.inputs.map((input: any) => input.type);
      }
    })

    const abiCoder: any = new AbiCoder();
    console.log(abiCoder);
    constructorData = abiCoder.encode(
      constructorArgs,
      args)
      console.log(constructorData);
  //   constructorData = abi.encodeDeploy([...libraries, ...args]);
  // } else if (args) {
  //   constructorData = abi.encodeDeploy([...args]);
  // } else if (libraries) {
  //   constructorData = abi.encodeDeploy([...libraries]);
  }
  return constructorData;
}