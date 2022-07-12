import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from "./routes/auth.js"
import { NotFoundError } from './utils/errors.js';
import { PORT } from './config.js'
import {extractUserFromJwt} from "./middleware/security.js"


const app = express();
// const port = 3001;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());


app.use(extractUserFromJwt)


app.use("/auth", authRoutes);


app.get('/', (req, res) => {
  res.json('main LifeTracker backend route works!')
})

//error handling
app.use((req,res,next) => {
  return(new NotFoundError)
})

app.use((err,req,res,next) => {
  const status = err.status || 500
  const message = err.message

  return res.status(status).json({
    error: {message,status}
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`)
})