import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";

// For environment variables, we can use the dotenv package.
// To install it, run the following command in the terminal:
// npm install dotenv
// Then, we can use it in our server.js file to load environment variables from a .env file.
// Add the following code at the top of the server.js file:
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


console.log(process.env.JWT_SECRET);

// Get path for static files
const __dirname = dirname(fileURLToPath(import.meta.url));



// Set up the express app to serve static files from the public folder
// and to parse JSON bodies in requests
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// Routes
app.use("/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});