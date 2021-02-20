require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

/**
 * Wrapper endpoint for the GitHub API to be used on my website
 * in order to go around the rate limit
 * (as this request is authenticated)
 */
router.get("/github/repos", async (_req, res) => {
  try {
    const repos = await axios.get(
      "https://api.github.com/users/PiotrRut/repos?sort=created",
      {
        headers: {
          Authorization: process.env.GITHUB_API_TOKEN,
        },
      }
    );
    res.status(200).send(repos.data);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
