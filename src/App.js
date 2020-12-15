import React from "react";
import HomeScreen from "./Components/Main";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LogIn from "./Components/User/login";
import Register from "./Components/User/register";
import Game from "./Components/Game"

const App = () => {
  return(
      <React.Fragment>
          <Router>
              <Switch>
                  <Route path="/" exact component={HomeScreen}/>
                  <Route path="/login" component={LogIn}/>
                  <Route path="/register" component={Register}/>
                  <Route path="/game" component={Game}/>
              </Switch>
          </Router>
      </React.Fragment>
  )
}

export default App;
