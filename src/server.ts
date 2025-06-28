import express from 'express';
const app = express();

const PORT = 5000;

app.use('/', (req,res)=>{
  res.send("Hello brother! welcome back!")
})

app.listen(PORT, ()=>{
  console.log("App is live. Enjoy coding!")
})