# Backend REST API for prutkowski.tech

This repository holds the REST API I have written with NodeJS and ExpressJS to assist my [personal website's](https://prutkowski.tech) functioning. For now it has two main tasks:

- **Returning low- and high-res versions of pictures stored in my Azure container** which are then passed on to my personal website's gallery page
- **Returning a list of my public GitHub repositories** to display on my website
  - Those are first fetched via GitHub's REST API every 15 mins, and written to a MongoDB collection if any changes are present in the latest pull

The reason for handling all GitHub traffic here is because by doing so I can send authenticated requests to the GitHub API, thus avoiding the rate limit on requests. I have also integrated this with a MongoDB cluster, which stores all my public repositories with only the fields I need on my website, and will automatically update the database every 15 minutes if it detects any changes (again this is to save network traffic and limit incoming requests to the DB cluster).
