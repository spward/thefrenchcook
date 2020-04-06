import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Callback from "./components/Callback/Callback";
import Header from "./components/Header/Header";
import "./App.css";

const App = () => {
  const [userInfo, setUserInfo] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [backendChecked, setBackendChecked] = useState(false);

  useEffect(() => {
    if (code && !userInfo && backendChecked) {
      fetch(`http://localhost:9000/callback?code=${code}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.userInfo && response.userInfo.email) {
            setUserInfo(response.userInfo);
            setError("");
          } else {
            setError("sorry something when wrong");
          }
        });
    }
  }, [code, userInfo, backendChecked]);

  useEffect(() => {
    if (!userInfo && !backendChecked) {
      fetch(`http://localhost:9000/userInfo`)
        .then((res) => res.json())
        .then((response) => {
          if (response.userInfo && response.userInfo.email) {
            setUserInfo(response.userInfo);
          }
          setError("");
          setBackendChecked(true);
        });
    }
  }, [userInfo, backendChecked]);

  const handleLogout = () => {
    fetch(`http://localhost:9000/logout`)
      .then((res) => res.json())
      .then((response) => {
        if (response.userInfo && !response.userInfo.email) {
          setCode("");
          setUserInfo({});
          setError("");
          setBackendChecked(false);
        }
      });
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/dashboard">
            <Header userInfo={userInfo} handleLogout={handleLogout} />
            <Dashboard
              userInfo={userInfo}
              error={error}
              setError={setError}
              backendChecked={backendChecked}
              code={code}
            />
          </Route>
          <Route exact path="/callback">
            <Callback setCode={setCode} />
          </Route>
          <Route exact path="/">
            <Home userInfo={userInfo} error={error} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
