const express = require("express");
const fetch = require("node-fetch");
const btoa = require("btoa");
const path = require("path");
const { catchAsync } = require("../utils");

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect = encodeURIComponent("http://localhost:3000/callback");

//you may consider storing this in database (_userInfos)
let _userInfo = { error: "user not found(is not logged in)" };
router.get("/login", (req, res) => {
  res.redirect(
    `https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify%20email&response_type=code&redirect_uri=${redirect}`
  );
});

router.get("/userInfo", (req, res) => {
  res.json({ userInfo: _userInfo });
});

router.get("/logout", (req, res) => {
  _userInfo = { error: "user not found(is not logged in)" };
  res.json({ userInfo: _userInfo });
});

router.get(
  "/callback",
  catchAsync(async (req, res) => {
    if (!req.query.code) throw new Error("NoCodeProvided");
    const code = req.query.code;
    const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const response = await fetch(
      `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${creds}`,
        },
      }
    );

    const json = await response.json();

    const fetchUser = await fetch("https://discordapp.com/api/users/@me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${json.access_token}`,
      },
    });

    const userInfo = await fetchUser.json();
    if (userInfo && userInfo.email) _userInfo = { ...userInfo };
    res.json({ userInfo });
  })
);

module.exports = router;
