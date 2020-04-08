import React from "react";
import { withRouter } from "react-router-dom";
import Logo from "../../assets/logo.png";
import DiscordLogo from "../../assets/discord.png";

import "./Home.scss";

const Home = ({ userInfo, history }) => (
  <div className="home">
    <div className="home__content">
      <img className="logo" src={Logo} alt="TheFrenchCook Logo" />
      <div>
        {userInfo && userInfo.email ? (
          <button onClick={() => history.push("/dashboard")}>
            Go to dashbord
          </button>
        ) : (
          <a href="http://localhost:9000/login">
            <img src={DiscordLogo} alt="Discord Icon" />
            Login through Discord
          </a>
        )}
      </div>
    </div>
  </div>
);

export default withRouter(Home);
