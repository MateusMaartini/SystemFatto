const mongoose = require("mongoose");

const tarefaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome da tarefa é obrigatório"],
      unique: true,
    },
    custo: {
      type: Number,
      required: [true, "O custo é obrigatório"],
    },
    dataLimite: {
      type: Date,
      required: [true, "A data limite é obrigatória"],
    },
    ordem: {
      type: Number,
      required: [true, "A ordem de apresentação é obrigatória"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tarefa", tarefaSchema);
