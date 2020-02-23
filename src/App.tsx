import * as React from "react";
import Overview from "./pages/Overview";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Overview />
          </Route>
          <Route exact path="/repositories" />
        </Switch>
      </Router>
    </div>
  );
}
