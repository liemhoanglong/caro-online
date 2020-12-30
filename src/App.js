import React from "react";
import HomeScreen from "./Components/Main";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {UserProvider} from "./Context/UserContext";

import LogIn from "./Components/User/login";
import Register from "./Components/User/register";
import Lobby from "./Components/Lobby";
import Game from "./Components/Game"
import NavigationBar from "./Components/Main/navigationBar";
import NotFoundPage from "./Components/Main/pageNotFound";
import {createMuiTheme,ThemeProvider} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#239478",
            contrastText: "#fff"
        },
        secondary: {
            main: "#2CB895"
        },
    },
});

const App = () => {
  return(
      <React.Fragment>
          <Router>
              <ThemeProvider theme={theme}>
                  <UserProvider>
                      <NavigationBar/>
                      <Switch>
                          <Route path="/" exact component={HomeScreen}/>
                          <Route path="/login" component={LogIn}/>
                          <Route path="/register" component={Register}/>
                          <Route path="/lobby" component={Lobby}/>
                          <Route path="/game/:id" component={Game}/>
                          <Route component={NotFoundPage}/>
                      </Switch>
                  </UserProvider>
              </ThemeProvider>
          </Router>
      </React.Fragment>
  )
}

export default App;
