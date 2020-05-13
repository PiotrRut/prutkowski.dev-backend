# prutkowski.tech backend!

This repository hold the very tiny API I have written to assist my personal website's gallery.

The gallery on [prutkowski.tech](https://prutkowski.tech) uses images which are stored on a Microsoft Azure blob container. I needed a way to seemlessly retrieve them from that storage and display on the website. The container holds two versions of each picture - full resolution one, and one which is compressed down. They compressed picture is the one users can (pre)view on my website, but thanks to the API retrieving both links for both pictures, they also have the option to access and download the ones which are in full resolution.

