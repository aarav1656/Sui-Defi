import { SignInButton, ethos } from "ethos-connect";
import { Disconnect, Fund, Mint, WalletActions } from "../ethos_components";

const MintNFT = () => {
  const { status, wallet } = ethos.useWallet();

  return (
    <div className="flex justify-between items-start">
      <div className="p-12 flex-1">Status: {status}</div>

      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex-6">
        { wallet &&  (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Mint />
              or
              <WalletActions />
              or
              <Disconnect />
            </div>
          </div>
        )}
      </div>

      <div className="p-12 flex-1 flex justify-end">
        <ethos.components.AddressWidget 
          // excludeButtons={[
          //   ethos.enums.AddressWidgetButtons.WalletExplorer
          // ]} 
        />
      </div>
    </div>
  );
};

export default MintNFT;
