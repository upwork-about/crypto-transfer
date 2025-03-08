import "./App.css";
import { getImageUrl } from "./utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import erc20ABI from "./assets/abi/erc20.json";
import { message } from "antd";

const tokenAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const toAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const bigNumberAmount = parseUnits("0.1", 6);

function App() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const transfer = async () => {
    try {
      console.log(address, bigNumberAmount, "address");
      const approveHash = await writeContractAsync({
        abi: erc20ABI,
        address: tokenAddress,
        functionName: "approve",
        args: [toAddress, bigNumberAmount],
      });
      console.log(approveHash, "approveHash");
      if (approveHash) {
        const txHash = await writeContractAsync({
          abi: erc20ABI,
          address: tokenAddress,
          functionName: "transfer",
          args: [toAddress, bigNumberAmount],
        });
        if (txHash) {
          message.success("Transfer success");
        }
      }
    } catch (error) {
      console.log(error, "error");
      message.error("Except for the problem, please try again");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#000] flex flex-col pb-[15vh]">
      {/* 顶部导航栏 */}
      <div className="flex flex-row px-3 md:px-3 lg:px-12 w-full justify-between items-center border-b border-gray-700">
        <div className="py-3 items-center pr-3 md:pr-3 lg:pr-12">
          <img className="h-[50.89px]" src={getImageUrl("logo.svg")} alt="icon logo text" />
        </div>
        <div className="flex-row ml-6 hidden lg:flex">
          <ConnectButton />
        </div>
      </div>

      <div className="container mx-auto flex-1 flex flex-col lg:flex-row items-center">
        <div className="flex-1 space-y-4">
          <h1 className="text-[#ffffff] text-[64px] font-semibold">Transfer you token</h1>
          {address ? (
            <button
              className="w-[178px] h-[48px] bg-[#5580F9] cursor-pointer text-[18px] rounded-[48px] font-semibold text-white hover:opacity-80"
              onClick={transfer}
            >
              Transfer
            </button>
          ) : (
            <ConnectButton />
          )}
        </div>
        <div className="flex-[1.4] mr-0 lg:mr-[-256px]">
          <img src={getImageUrl("hero.svg")} className="max-w-[1080px] w-full" alt="hero" />
        </div>
      </div>
    </div>
  );
}

export default App;
