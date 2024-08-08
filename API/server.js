import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js";
import bodyParser from "express";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
// import paymentRouter from "./Routes/payment.js";
import cors from "cors";
const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//home testing route
app.get("/", (req, res) => res.json({ message: "This is home route" }));

app.use("/api/user", userRouter);

//product router
app.use("/api/product", productRouter);

//cart router
app.use("/api/cart", cartRouter);

// address router
app.use("/api/address", addressRouter);

// payment Router
// app.use("/api/payment", paymentRouter);

mongoose
  .connect(
    "mongodb+srv://vidhi2005ajmera:ypOpxNFhb0sS8syp@cluster0.dmhnk8y.mongodb.net/MERN_E_Commerce", // Include dbName in the connection string
    {
      dbName: "Mern_E_commerce",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected successfully..."))
  .catch((error) => console.log(error));

const port = 8080; // Define the port variable

app.listen(port, () => console.log(`Server is running on port ${port}`));
