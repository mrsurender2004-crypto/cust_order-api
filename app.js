const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();

const customerRoutes = require('./routes/customers');

app.use(cors());
app.use(express.json());
app.use('/api/customers', customerRoutes);

// Load SSL cert
const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.cert')
};

https.createServer(options, app).listen(3000, () => {
  console.log('🔒 HTTPS Server running on port 3000');
});
