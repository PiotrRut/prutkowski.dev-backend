# Back end for prutkowski.tech

This repository holds the very tiny REST API I have written with NodeJS and ExpressJS to assist my personal website's functioning. For now it has two main tasks: **returning low- and high-res versions of pictures stored in my Azure container** which later passed on to my personal website and displayed in the gallery tab, as well as **return a list of my public GitHub repositories** to display on my website.

The reason for handling all GitHub traffic here is because by doing so I can send authenticated requests to the GitHub API, thus avoiding the rate limit on requests. I have also integrated this with a MongoDB cluster, which stores all my public repositories with only the fields I need on my website, and will automatically update the database every 15 minutes if it detects any changes (again this is to save network traffic and limit incoming requests to the DB cluster).
