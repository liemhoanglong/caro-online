import React from "react";
import HomeScreen from "./Components/Main";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LogIn from "./Components/User/login";
import Register from "./Components/User/register";
import Lobby from "./Components/Lobby/Main";
import Game from "./Components/Game"
import {UserProvider} from "./Components/User/UserContext";
import NavigationBar from "./Components/Main/navigationBar";

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
                  </Switch>
              </UserProvider>
          </Router>
      </React.Fragment>
  )
}

export default App;
