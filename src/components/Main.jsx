// Libraries
import React from "react";

// Components
import LandingPage from "./LandingPage";

const Main = props => (
  <LandingPage>
    <section className="Content">
      <main className="Container">
        {props.widget}
      </main>
    </section>
  </LandingPage>
);

export default Main;
