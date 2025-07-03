import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 5000;
const PYTHON_API_URL = "http://localhost:8000";

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "Node.js server is running",
    timestamp: new Date().toISOString(),
  });
});

// Query endpoint - proxy to Python FastAPI
app.post("/api/query", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "Question is required",
        answer: "Please provide a question to get an answer.",
      });
    }

    // Forward request to Python FastAPI server
    const response = await axios.post(`${PYTHON_API_URL}/api/query`, {
      question: question,
    });

    // Return the response from Python server
    res.json(response.data);
  } catch (error) {
    console.error("Error forwarding to Python API:", error.message);

    if (error.response) {
      // Python server responded with an error
      res.status(error.response.status).json({
        error: "Error from Python API",
        answer:
          "Sorry, there was an error processing your question. Please try again.",
      });
    } else if (error.request) {
      // Python server is not responding
      res.status(503).json({
        error: "Python API unavailable",
        answer:
          "The AI service is currently unavailable. Please try again later.",
      });
    } else {
      // Other error
      res.status(500).json({
        error: "Internal server error",
        answer: "An unexpected error occurred. Please try again.",
      });
    }
  }
});

// Check Python API health
app.get("/api/python-health", async (req, res) => {
  try {
    const response = await axios.get(`${PYTHON_API_URL}/health`);
    res.json({
      status: "Python API is connected",
      pythonResponse: response.data,
    });
  } catch (error) {
    res.status(503).json({
      status: "Python API is unavailable",
      error: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Node.js server running on http://localhost:${PORT}`);
  console.log(`🔗 Proxying to Python API at ${PYTHON_API_URL}`);
});
