// Libraries
import { observable, action } from "mobx";

// Utils
import * as blockchain from "../utils/blockchain";
import { methodSig, toBigNumber } from "../utils/helpers";

// Settings
import * as settings from "../settings";

export default class ProfileStore {
  @observable proxy = -1;
  @observable proxyBalance = toBigNumber(-1);

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setBalance = async () => {
    console.log("setBalance");
    this.proxyBalance = await blockchain.getEthBalanceOf(this.proxy);
  };

  @action setProxy = proxy => {
    this.proxy = proxy;
    blockchain.loadObject("dsproxy", this.proxy, "proxy");
    console.log("proxy", this.proxy);
    this.setBalance();
    setInterval(this.setBalance, 3000);
  }

  @action recoverETH = () => {
    blockchain.objects.proxy.execute["address,bytes"](
      settings.chain[this.rootStore.network.network].proxyContracts.tokenRecovery,
      methodSig("recoverETH()"),
      (e, tx) => {
        if (!e) {
          this.rootStore.transactions.logPendingTransaction(tx, "");
        } else {
          console.log(e);
          this.rootStore.transactions.logTransactionFailed(tx);
        }
      }
    );
  }
}
