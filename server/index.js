import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mangoDB/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("hello from DALL-E API");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    const port = process.env.PORT;
    app.listen(
      port,
      console.log(`server has started on port http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
