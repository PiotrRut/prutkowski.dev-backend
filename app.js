require('dotenv').config();
const express = require('express');
const app = express();
const port =  process.env.PORT || 3001
const gallery = require('./routes/gallery')

// Set the view engine to ejs for index page rendering
app.set('view engine', 'ejs');

// CORS (Cross-Origin Resource Sharing) config, preventing violations in the future
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization')
  res.header("Access-Control-Allow-Methods", '*')
  next()
})

// Import the gallery routes
app.use('/gallery', gallery)

// Render index.ejs on root endpoint (/)
app.get('/', (req, res) => {
  res.render('pages/index');
})


app.listen(port, () => console.log(`Server running on port ${port}`))