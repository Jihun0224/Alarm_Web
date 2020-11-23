import React from "react";
import Home from "./Home";
import { Route } from "react-router-dom";
import Alarm_Add from "./alarm_add";
import Helmet from 'react-helmet';
import Alarm from './alarm'
function App() {
  return (
    <div >
            <Helmet bodyAttributes={{style: 'background-color : #f3f3f3'}}/> 
            <Route exact path="/" component={Home} />
            <Route exact path="/alarm/add" component={Alarm_Add} />
            <Route exact path="/alarm" component={Alarm} />

    </div>
  );
}

export default App;
