import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

if (env !== 'production') {
    require('./production')(app);
}

app.get('/', (req, res) => {
  res.send('Some placeholder text!');
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
