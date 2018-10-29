// Libraries
import React from "react";
import {Provider} from "mobx-react";

// Components
import Main from "./Main";
import Widget from "./Widget";

// Stores
import rootStore from "../stores/Root";

// Utils
import * as blockchain from "../utils/blockchain";

// Convenient console access
window.blockchain = blockchain;
window.network = rootStore.network;
window.profile = rootStore.profile;
window.transactions = rootStore.transactions;

class App extends React.Component {
  render() {
    return (
      <Provider {...rootStore}>
        <Main widget={<Widget section="" />} />
      </Provider>
    );
  }
}

export default App;
