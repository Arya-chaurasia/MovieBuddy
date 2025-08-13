const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: ["https://gem-flix-ai.vercel.app", "http://localhost:3000"],
  //credentials: true,
};

app.use(cors(corsOptions));

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

app.post("/api/gemini", async (req, res) => {
  const { prompt } = req.body;

  console.log("Received prompt:", prompt);

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });


    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini error response:", errorData);
      return res.status(response.status).json({ error: errorData.error || "Gemini API error" });
    }

    const data = await response.json();

    console.log("raw data:", JSON.stringify(data));

    // Extract text from Gemini API response
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("text:", text);

    res.json({ text });
  } catch (error) {
    console.error("Gemini API call error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Gemini backend running on port ${PORT}`);
});
