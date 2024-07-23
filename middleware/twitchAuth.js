const axios = require("axios");
require("dotenv").config();

async function twitchAuthorization() {
  try {
    const response = await axios.post(
      "hettps://id.twitch.tv/oauth2/token",
      null,
      {
        params: {
          client_id: process.env.TWITCH_CLIENT_ID,
          client_secret: process.env.TWITCH_CLIENT_SECRET,
          grant_type: "client_credentials",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Twitch Authorization", error);
  }
}

module.exports = { twitchAuthorization };
