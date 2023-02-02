const express = require('express');
const app = express();
app.use(express.json());

const router = require('./routers/index');

app.use('/api', router);

const port = 3000;

app.listen(port, () => {
  console.log('Listening on port 3000...');
});
