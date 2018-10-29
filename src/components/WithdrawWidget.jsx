// Libraries
import React from "react";
import {inject, observer} from "mobx-react";

// Utils
import {formatNumber, etherscanTx} from "../utils/helpers";

@inject("network")
@inject("profile")
@inject("transactions")
@observer
class WithdrawWidget extends React.Component {
  render() {
    return (
      <div>
        <section className="frame">
          {
            this.props.profile.proxy === -1
            ?
              "Loading proxy"
            :
              this.props.profile.proxy === null
              ?
                "This wallet doesn't have a proxy"
              :
              this.props.profile.proxyBalance && this.props.profile.proxyBalance.gte(0)
                ?
                  <span>
                    Your Proxy has { formatNumber(this.props.profile.proxyBalance) } ETH locked
                    {
                      this.props.profile.proxyBalance.gt(0) &&
                      <input type="button" value="Send ETH back to your wallet" onClick={ this.props.profile.recoverETH } />
                    }
                  </span>
                :
                  <span>Loading proxy balance...</span>
          }
          {
            Object.keys(this.props.transactions.registry).length > 0 &&
            Object.keys(this.props.transactions.registry).map(tx => 
              <span key={tx}>
                Transaction {etherscanTx(this.props.network.network, `${tx.substring(0, 20)}...`, tx)} {this.props.transactions.registry[tx].pending
                                  ?
                                    "is pending"
                                  : 
                                    this.props.transactions.registry[tx].failed
                                      ? "failed"
                                      : "is confirmed"
                                  }
              </span>
            )
          }
        </section>
      </div>
    )
  }
}

export default WithdrawWidget;
