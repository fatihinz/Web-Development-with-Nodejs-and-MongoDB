import express from 'express';
import parser from 'body-parser';
import apiRoutes from './routes/api';

const app = new express();
app.use(parser.urlencoded({
  extended: false
}));
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  return res.send('Hello world');
});

app.listen(process.env.PORT || 3000);
