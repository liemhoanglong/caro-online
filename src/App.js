import React from "react";
import HomeScreen from "./Components/Main";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {UserProvider} from "./Context/UserContext";

import LogIn from "./Components/User/login";
import Register from "./Components/User/register";
import Lobby from "./Components/Lobby";
import Game from "./Components/Game"
import NavigationBar from "./Components/Main/navigationBar";
import ListUser from "./Components/ListUser";

const App = () => {
  return(
      <React.Fragment>
          <Router>
              <UserProvider>
                  <NavigationBar/>
                  <Switch>
                      <Route path="/" exact component={HomeScreen}/>
                      <Route path="/login" component={LogIn}/>
                      <Route path="/register" component={Register}/>
                      <Route path="/lobby" component={Lobby}/>
                      <Route path="/game" component={Game}/>
                      <Route path="/testing" component={ListUser}/>
                  </Switch>
              </UserProvider>
          </Router>
      </React.Fragment>
  )
}

export default App;
