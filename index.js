const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const geminiRes = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAdSLDNR4Vq20pl84EbWikvlpAgJIH4Mxc",
      {
        contents: [{ parts: [{ text: messages[messages.length - 1].text }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = geminiRes.data;
    const message = data.candidates[0].content.parts[0].text;
    res.status(200).json({ text: message });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
