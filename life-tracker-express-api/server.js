import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from "./routes/auth.js"


const app = express();
const port = 3001;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`)
})