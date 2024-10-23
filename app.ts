// Import the 'express' module
import * as dotenv from "dotenv";
import express from 'express';
import { server } from './mocks/node';
import { trackingRouter } from './src/routes/trackingRouter';
 
server.listen();

// Create an Express application
const app = express();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
app.use(express.json());
app.use("/tracking", trackingRouter);

// Start the server and listen on the specified port
app.listen(Number(process.env.PORT), String(process.env.HOST), () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});