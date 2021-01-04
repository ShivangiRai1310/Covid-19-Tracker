import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Worldwide from "./Components/Worldwide";
import Statewise from "./Components/Statewise";
import Countrywise from "./Components/Countrywise";

function App() {
  return (
    <Router>
      <div className="appe">
        <Header />
        <Switch>
        
          <Route path="/worldwide">
            <Worldwide />
          </Route>

          <Route path="/statewise">
            <Statewise />
          </Route>

          <Route path="/countrywise">
            <Countrywise />
          </Route>

          <Route path="./">
            <Worldwide />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
