import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'API is healthy ✅' });
});


export default app;
