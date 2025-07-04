project:
  name: "UMS ChatBot"
  description: >
    UMS ChatBot is an AI-powered university assistant that answers student queries
    about courses, registration, results, and other academic details.
    It uses a React frontend, Node.js + Express backend, and a Python RAG pipeline
    built with LangChain, FAISS, and OpenAI Embeddings.

  highlights:
    - Retrieval-Augmented Generation (RAG) pipeline with custom JSON knowledge base.
    - Interactive chatbot UI built with React + Tailwind CSS.
    - Node.js backend connects React to Python logic.
    - Fast semantic search and answer generation.

  tech_stack:
    frontend: "React, Tailwind CSS"
    backend: "Node.js, Express"
    rag_pipeline: "Python, LangChain, FAISS, OpenAI API"
    other: "dotenv"

  folder_structure: |
    UMS-Chatbot/
     ├── client/         # React frontend
     │   ├── public/
     │   ├── src/
     │   │   ├── App.js
     │   │   ├── index.js
     │   │   ├── styles/
     │   ├── package.json
     ├── server/         # Node.js backend
     │   ├── index.js
     │   ├── package.json
     ├── rag/            # Python RAG pipeline
     │   ├── main.py
     │   ├── ums_paths.json
     │   ├── .env
     ├── README.md

  setup:
    steps:
      - step: "Clone the repo"
        command: |
          git clone https://github.com/Shaktiprasadram22/Ums_chatbot_01.git
          cd Ums_chatbot_01

      - step: "Install Backend dependencies"
        command: |
          cd server
          npm install

      - step: "Install Frontend dependencies"
        command: |
          cd ../client
          npm install

      - step: "Install Python dependencies"
        command: |
          cd ../rag
          pip install openai langchain faiss-cpu python-dotenv

      - step: "Add .env for OpenAI key"
        note: |
          Create a .env file in rag/ with:
            OPENAI_API_KEY=YOUR_OPENAI_API_KEY

  how_to_run:
    python_rag_pipeline: |
      cd rag
      python main.py

    node_backend: |
      cd server
      node index.js

    react_frontend: |
      cd client
      npm start

    access: "Open http://localhost:3000 in your browser"

  workflow:
    - "React sends user query to Express server."
    - "Express calls Python RAG pipeline."
    - "Python searches vector DB and returns answer."
    - "Express responds to React."
    - "Chatbot displays the reply."

  key_skills:
    - React
    - Node.js
    - Express.js
    - Python
    - LangChain
    - FAISS
    - OpenAI Embeddings
    - REST API
    - dotenv
    - CORS
    - JSON knowledge base

  personal_interests:
    - Photography
    - Web Development

  github_repository: "https://github.com/Shaktiprasadram22/Ums_chatbot_01/"

  license: "MIT License"

  author: "Built by Shakti Prasad Ram"

# -----------------------------------------------
# SYSTEM DESIGN
# -----------------------------------------------

system_design: |
  ---
  -> React Frontend:
       - Provides interactive chat interface.
       - Sends user questions to Express API.
       - Displays answers dynamically.
  ---
  -> Node.js + Express Backend:
       - Receives HTTP POST requests from React.
       - Spawns Python process with question.
       - Gets RAG pipeline result.
       - Sends response back to React.
  ---
  -> Python RAG Pipeline:
       - Loads knowledge base JSON.
       - Splits and embeds text with LangChain + OpenAI.
       - Uses FAISS vector store for fast semantic search.
       - Returns best answer for user query.
  ---
  -> Data Flow:
       User -> React -> Express -> Python -> FAISS Search -> Python -> Express -> React -> User
  ---
  -> .env Security:
       OpenAI API key is secured in `.env` and loaded at runtime.

  
