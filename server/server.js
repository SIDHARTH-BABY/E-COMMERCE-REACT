import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import sellerRoute from "./routes/sellerRoute.js";
import buyerRoute from "./routes/buyerRoute.js";
import razorpayRoute from "./routes/razorpayRoute.js";
import cart from "./routes/cart.js";
dotenv.config();

import supertokens from "supertokens-node";
import { middleware } from "supertokens-node/framework/express/index.js";
import { errorHandler } from "supertokens-node/framework/express/index.js";
import Dashboard from "supertokens-node/recipe/dashboard/index.js";
import { superTokenConfig } from "./config.js";


supertokens.init(superTokenConfig);

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);
app.use(middleware());

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`successfully connected to ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/seller", sellerRoute);
app.use("/buyer", buyerRoute);
app.use("/cart", cart);
app.use("/razorpay",razorpayRoute)

// Add this AFTER all your routes
app.use(errorHandler());

// your own error handler
// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
// Your error handler logic
// });
