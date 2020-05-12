require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port =  process.env.PORT || 3001
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

// CORS (Cross-Origin Resource Sharing) config, preventing violations in the future
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization')
  res.header("Access-Control-Allow-Methods", '*')
  next()
})

app.use(cookieParser());
app.get('/', (req, res) => res.send('API is working correctly!'))

function formatPublicURL(key){
  return `https://prutkowskigallery.blob.core.windows.net/gallery/${key}`
}

async function getBlobName() {
  const blobSasUrl = `https://${process.env.AZURE_SPACE}.blob.core.windows.net/?${process.env.AZURE_TOKEN}`
  // Connect to a new BlobServiceClient
  const blobServiceClient = new BlobServiceClient(blobSasUrl);
  // Get a container client from the BlobServiceClient
  const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER);
  const response = []

  for await (const blob of containerClient.listBlobsFlat()) {
    response.push(blob.name)
  };
  console.log(response)
  return response;
}


app.get('/blobs', async (req, res) => {
  const response = []
    const blobSasUrl = `https://${process.env.AZURE_SPACE}.blob.core.windows.net/?${process.env.AZURE_TOKEN}`
    // Connect to a new BlobServiceClient
    const blobServiceClient = new BlobServiceClient(blobSasUrl);
    // Get a container client from the BlobServiceClient
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER);
  
    for await (const blob of containerClient.listBlobsFlat()) {
      response.push({URL: formatPublicURL(blob.name)})
      
    };
    res.status(200).send(response)
})


app.listen(port, () => console.log(`Server running on port ${port}`))