import React from "react";
import "./Header.scss";
import Logo from "../../assets/logo.png";
const Header = ({ userInfo, handleLogout }) => {
  return (
    <React.Fragment>
      {userInfo && userInfo.email ? (
        <div className="header">
          <div className="header__logo">
            <img src={Logo} alt="TheFrenchCook Logo" />
            <h1>TheFrenchCook</h1>
          </div>
          <div className="header__info">
            <p>
              {userInfo.username}#{userInfo.discriminator}
            </p>
            {userInfo.avatar ? (
              <img
                src={`https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.jpg`}
                className="profile__pic"
              />
            ) : (
              "no avatar is set for this user"
            )}
            <a onClick={handleLogout}>Logout</a>
          </div>
        </div>
      ) : null}{" "}
    </React.Fragment>
  );
};

export default Header;
