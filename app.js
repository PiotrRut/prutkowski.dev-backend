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

// Create a new url to access the image with the image file name appended at the end
function formatPublicURL(key){
  return `https://prutkowskigallery.blob.core.windows.net/gallery/${key}`
}


app.get('/blobs', async (req, res) => {
  const response = []
  let urls = []
    const blobSasUrl = `https://${process.env.AZURE_SPACE}.blob.core.windows.net/?${process.env.AZURE_TOKEN}`
    // Connect to a new BlobServiceClient
    const blobServiceClient = new BlobServiceClient(blobSasUrl);
    // Get a container client from the BlobServiceClient
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER);
  
    // Grab all file names from the container and append to "urls"
    for await (const blob of containerClient.listBlobsFlat()) {
      urls.push(blob.name)
    };
    // Sort the files into lowRes and highRes links
    urls = urls.filter(photo => photo.includes('-compressed'))
      urls.forEach(name  => {
        photo = {
          lowRes: formatPublicURL(name),
          highRes: formatPublicURL(name).replace('-compressed', '')
        }
      response.push(photo)
      })
    res.status(200).send(response)
})


app.listen(port, () => console.log(`Server running on port ${port}`))