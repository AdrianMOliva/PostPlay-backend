const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");

const getTwitchToken = async () => {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  try {
    const response = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
    );
    const { access_token } = response.data;

    return access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
  }
};

const fetchIGDBData = async (accessToken) => {
  const clientId = process.env.TWITCH_CLIENT_ID;

  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      'fields *, genres.name, platforms.name, cover.url, cover.image_id; where version_parent = null; search "sims" ;  limit 50;',
      {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching IGDB data:", error);
  }
};

module.exports = { fetchIGDBData, getTwitchToken };
