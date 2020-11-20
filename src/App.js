import React from "react";
import Home from "./Home";
import { Route } from "react-router-dom";
import Alarm from "./alarm";
import Helmet from 'react-helmet';

function App() {
  return (
    <div >
            <Helmet bodyAttributes={{style: 'background-color : #f3f3f3'}}/> 
            <Route exact path="/" component={Home} />
            <Route exact path="/alarm" component={Alarm} />

    </div>
  );
}

export default App;
