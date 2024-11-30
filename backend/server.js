const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const tarefaRoutes = require("./routes/tarefaRoutes");
const { errorHandler } = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/tarefas", tarefaRoutes);

// Middleware de erros
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
