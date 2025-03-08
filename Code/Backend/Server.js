require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",  // Allow all origins (for testing)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/grocerymind", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/shopping-list", require("./routes/shoppingList"));
app.use("/api/members", require("./routes/member"));
app.use("/api/foods", require("./routes/food"));
app.use("/api/categories", require("./routes/category"));

// Protected Route Example
const auth = require("./middleware/auth");
app.get("/api/protected", auth, (req, res) => {
  res.json({ message: "You have accessed a protected route!" });
});

// Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
