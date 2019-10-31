import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./scenes/Home/Home"
import Flow from "./scenes/Flow/Flow"
import Header from "./components/layout/header/header"
import FooterCover from "./components/layout/footer-cover/footer-cover"

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/flow" component={Flow} />
        </Switch>
        <FooterCover />
      </div>
    </Router>
  );
}
//<Route path="/about" component={About} />