import { useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const contract_address = "0x4cee8d36d1eBDF35914894AcB871B9b889c779E4";
  const [tokenAddress, setTokenAddress] = useState(contract_address);

  return (
    <GlobalContext.Provider
      value={{
        tokenAddress,
        setTokenAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
