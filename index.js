const fs = require('fs');
const opn = require('opn');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

const publicPath = path.join(__dirname, 'client', 'build');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.send(fs.readFileSync(path.join(publicPath, 'index.html')).toString());
});

app.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log(`MILL is listening on ${url}!`);
  opn(url);
});
