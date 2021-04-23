import React from "react";
import HomeScreen from "./Components/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { UserProvider } from "./Context/UserContext";
import LogIn from "./Components/User/login";
import Register from "./Components/User/register";
import Activate from "./Components/User/activate";
import ForgotPassword from "./Components/User/forgotPassword";
import ResetPassword from "./Components/User/resetPassword";
import Lobby from "./Components/Lobby";
import Game from "./Components/Game"
import NavigationBar from "./Components/Main/navigationBar";
import NotFoundPage from "./Components/Main/pageNotFound";
import Profile from "./Components/Profile";
import History from "./Components/History";
import HistoryRoom from "./Components/HistoryRoom";
import Leaderboard from "./Components/Leaderboard";
import './App.css';

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
    return (
        <React.Fragment>
            <Router>
                <ThemeProvider theme={theme}>
                    <UserProvider>
                        <div className='bg' />
                        <NavigationBar />
                        <Switch>
                            <Route path="/" exact component={HomeScreen} />
                            <Route path="/login" component={LogIn} />
                            <Route path="/register" component={Register} />
                            <Route path="/lobby" component={Lobby} />
                            {/* <Route path="/game/:id" component={Game} /> */}
                            <Route path="/users/activate/:id" exact component={Activate} />
                            <Route path="/users/forgot-password" exact component={ForgotPassword} />
                            <Route path="/users/reset-password/:id" exact component={ResetPassword} />
                            <Route path="/game/:id" component={(match) => Game(match)} />
                            <Route path="/history" component={History} />
                            <Route path="/history-room/:id" component={HistoryRoom} />
                            <Route path="/leaderboard" component={Leaderboard} />
                            <Route
                                path="/profile"
                                render={(props) => (
                                    <Profile />
                                )}
                            />
                            <Route component={NotFoundPage} />
                        </Switch>
                    </UserProvider>
                </ThemeProvider>
            </Router>
        </React.Fragment>
    )
}

export default App;
