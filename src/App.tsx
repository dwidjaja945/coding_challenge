import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import Repositories from './pages/Repositories';
import Header from "./components/Header";
import { RepositoriesProvider } from './providers/RepositoriesProvider';
import "./styles.css";

export default function App() {
    return (
        <div className="App">
            <Router>
                <RepositoriesProvider>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Overview />
                        </Route>
                        <Route path="/repositories">
                            <Repositories />
                        </Route>
                    </Switch>
                </RepositoriesProvider>
            </Router>
        </div>
    );
}
