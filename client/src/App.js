import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Party from "./components/parties/partyPage";
import NewVenue from "./components/parties/newVenue";

import React from "react";

const Routes = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Landing} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/partyPage" component={Party} />
        <Route exact path="/newVenue" component={NewVenue} />
      </div>
    </Router>
  );
};

function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
