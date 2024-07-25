const axios = require("axios");
const { getTwitchToken } = require("./twitchAuth");
require("dotenv").config();

async function fetchIGDBData() {
  try {
    const accessToken = await getTwitchToken();

    const headers = {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post(`https://api.igdb.com/v4/games`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data from IGDB API:", error);
  }
}

module.exports = { fetchIGDBData };
