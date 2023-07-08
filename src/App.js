import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import Header from "./Component/Header";
import dao from "./Contract/Dao.json";
//import "ethereum/web3";

const AppState = createContext();
function App() {
  // const { ethereum } = window;
  const [DaoContract, setDaoContract] = useState();
  useEffect(() => {
    const loadEthereum = async () => {
      if (typeof window.ethereum !== "undefined") {
        const DaoContractAddress = "0x775C4c31AbBeaf170257805231E3d37D10908232";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const DaoContract = new ethers.Contract(
          DaoContractAddress,
          dao.output.abi,
          signer
        );
        setDaoContract(DaoContract);
      } else {
        console.log("No Ethereum provider found. Install Metamask.");
      }
    };
    loadEthereum();
  }, []);

  return (
    <AppState.Provider
      value={{
        DaoContract,
      }}
    >
      <div>
        {typeof window.ethereum != "undefined" ? (
          <Header />
        ) : (
          <div className="flex flex-col justify-center items-center mt-10">
            {/* install Metamask */}
            <h1 class=" text-xl title-font  text-black mb-1">
              Install Metamask to access DAO
            </h1>
            <a
              target={"_blank"}
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              rel="noreferrer"
            >
              <div className="flex border-opacity-60 bg-opacity-90 text-lg font-medium border-2 border-black cursor-pointer bg-black text-white mt-4 rounded-lg justify-center items-center py-1 px-2">
                Install Metamask
                <img className="h-11" src="metamask.png" alt="metamask logo" />
              </div>
            </a>
            <p className="text-white text-lg mt-2">
              Login Required Metamask Extension
            </p>
          </div>
        )}
      </div>
    </AppState.Provider>
  );
}

export default App;
export { AppState };
