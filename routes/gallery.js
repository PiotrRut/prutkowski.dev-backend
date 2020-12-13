require("dotenv").config();
const express = require("express");
const router = express.Router();
const { BlobServiceClient } = require("@azure/storage-blob");

/* Blob Service Setup */

// SAS Connection string
const blobSasUrl = `https://${process.env.AZURE_SPACE}.blob.core.windows.net/?${process.env.AZURE_TOKEN}`;
// Connect to a new BlobServiceClient
const blobServiceClient = new BlobServiceClient(blobSasUrl);
// Get a container client from the BlobServiceClient
const containerClient = blobServiceClient.getContainerClient(
  process.env.AZURE_CONTAINER
);

/* Functions */

// Create a new url to access the image with the image file name appended at the end
function genImageUrl(key) {
  return `https://${process.env.AZURE_SPACE}.blob.core.windows.net/${process.env.AZURE_CONTAINER}/${key}`;
}

// Endpoint responsible for returning full-res and low-res URL for each picture (blob)
router.get("/getAllPhotos", async (req, res) => {
  const response = [];
  let urls = [];
  // Grab all file names from the container and append to "urls"
  for await (const blob of containerClient.listBlobsFlat()) {
    urls.push(blob.name);
  }

  // Sort the files into low-res and high-res links
  urls = urls.filter((photo) => photo.includes("-compressed"));
  urls.forEach((name) => {
    image = {
      lowRes: genImageUrl(name),
      highRes: genImageUrl(name).replace("-compressed", ""),
    };
    response.push(image);
  });
  res.status(200).send(response);
});

module.exports = router;
