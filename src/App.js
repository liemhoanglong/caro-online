import React from "react";
import HomeScreen from "./Components/Main";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LogIn from "./Components/User/login";
import Register from "./Components/User/register";

const App = () => {
  return(
      <React.Fragment>
          <Router>
              <Switch>
                  <Route path="/" exact component={HomeScreen}/>
                  <Route path="/login" component={LogIn}/>}
                  <Route path="/register" component={Register}/>
              </Switch>
          </Router>
      </React.Fragment>
  )
}

export default App;
