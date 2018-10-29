// Libraries
import {observable} from "mobx";

// Utils
import * as blockchain from "../utils/blockchain";

export default class TransactionsStore {
  @observable registry = {};

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  reset = () => {
    this.registry = {};
  }

  checkPendingTransactions = () => {
    Object.keys(this.registry).map(tx => {
      if (this.registry[tx].pending) {
        blockchain.getTransactionReceipt(tx).then(r => {
          if (r !== null) {
            if (r.status === "0x1") {
              this.logTransactionConfirmed(tx);
            } else {
              this.logTransactionFailed(tx);
            }
          }
        })
      }
      return false;
    });
  }


  logPendingTransaction = (tx, title, callbacks = []) => {
    const msgTemp = "Transaction TX was created. Waiting for confirmation...";
    const registry = {...this.registry};
    registry[tx] = {pending: true, title, callbacks};
    this.registry = registry;
    console.debug(msgTemp.replace("TX", tx));
  }

  logTransactionConfirmed = tx => {
    const msgTemp = "Transaction TX was confirmed.";
    if (this.registry[tx] && this.registry[tx].pending) {
      const registry = {...this.registry};
      registry[tx].pending = false;
      this.registry = registry;
      console.debug(msgTemp.replace("TX", tx));
    }
  }

  logTransactionFailed = tx => {
    const msgTemp = "Transaction TX failed.";
    if (this.registry[tx]) {
      const registry = {...this.registry};
      registry[tx].pending = false;
      registry[tx].failed = true;
      this.registry = registry;
      console.debug(msgTemp.replace("TX", tx));
    }
  }
}
