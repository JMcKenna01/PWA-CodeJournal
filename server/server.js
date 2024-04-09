const express = require('express');
const path = require('path'); // Import the path module

const app = express();
const PORT = process.env.PORT || 3000;

// Define the directory path to serve static files from
const staticDirPath = path.join(__dirname, '../client/dist');

// Serve static files from the defined directory
app.use(express.static(staticDirPath));

// Set up body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import and set up your HTML routes
require('./routes/htmlRoutes')(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
