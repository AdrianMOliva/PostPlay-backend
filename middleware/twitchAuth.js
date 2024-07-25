const axios = require("axios");
require("dotenv").config();

async function twitchAuthorization() {
  try {
    const response = await axios.post(
      "https://id.twitch.tv/oauth2/token",
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

async function getTwitchToken() {
  try {
    const response = await twitchAuthorization();
    return response;
  } catch (error) {
    console.error("Error getting Twitch token", error);
    throw new Error("Failed to get Twitch token");
  }
}

module.exports = { twitchAuthorization, getTwitchToken };
