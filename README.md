# Back end for prutkowski.tech

This repository holds the very tiny API I have written with NodeJS and ExpressJS to assist my personal website's gallery. It generates the URLs to access each image (_as the URL structure is the same for every image, I only have to append the file name to the end of the URL_) as well as returns URLs for both the full resolution, and the compressed version of each image through an HTTP GET request.

The gallery on [prutkowski.tech](https://prutkowski.tech) uses images stored on a Microsoft Azure blob container. I needed a way to seemlessly retrieve this data from the container and display it on the website. 

The container holds two versions of each picture - full resolution one, and one which is compressed down. They compressed picture is the one users can (pre)view on my website, where they also get an option to access the full resolution one.


