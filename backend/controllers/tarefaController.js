const Tarefa = require("../models/tarefa");

// Lista todas as tarefas
const getTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find().sort({ ordem: 1 });
    res.status(200).json(tarefas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar tarefas" });
  }
};

// Cria uma nova tarefa
const createTarefa = async (req, res) => {
  const { nome, custo, dataLimite } = req.body;
  try {
    const ultimaTarefa = await Tarefa.findOne().sort({ ordem: -1 });
    const ordem = ultimaTarefa ? ultimaTarefa.ordem + 1 : 1;

    const tarefa = await Tarefa.create({ nome, custo, dataLimite, ordem });
    res.status(201).json(tarefa);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar tarefa", error });
  }
};

// Edita uma tarefa existente
const updateTarefa = async (req, res) => {
  const { id } = req.params;
  const { nome, custo, dataLimite } = req.body;

  try {
    const tarefaExistente = await Tarefa.findOne({ nome });
    if (tarefaExistente && tarefaExistente._id.toString() !== id) {
      return res.status(400).json({ message: "Nome da tarefa já existe" });
    }

    const tarefa = await Tarefa.findByIdAndUpdate(
      id,
      { nome, custo, dataLimite },
      { new: true }
    );
    res.status(200).json(tarefa);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar tarefa", error });
  }
};

// Exclui uma tarefa
const deleteTarefa = async (req, res) => {
  const { id } = req.params;

  try {
    await Tarefa.findByIdAndDelete(id);
    res.status(200).json({ message: "Tarefa excluída com sucesso" });
  } catch (error) {
    res.status(400).json({ message: "Erro ao excluir tarefa", error });
  }
};

// Altera a ordem de apresentação
const reorderTarefas = async (req, res) => {
  const { ordemAtual, novaOrdem } = req.body;

  try {
    const tarefa = await Tarefa.findOne({ ordem: ordemAtual });
    const tarefaDestino = await Tarefa.findOne({ ordem: novaOrdem });

    if (!tarefa || !tarefaDestino) {
      return res.status(400).json({ message: "Tarefa não encontrada" });
    }

    tarefa.ordem = novaOrdem;
    tarefaDestino.ordem = ordemAtual;

    await tarefa.save();
    await tarefaDestino.save();

    res.status(200).json({ message: "Reordenação concluída" });
  } catch (error) {
    res.status(400).json({ message: "Erro ao reordenar tarefas", error });
  }
};

module.exports = {
  getTarefas,
  createTarefa,
  updateTarefa,
  deleteTarefa,
  reorderTarefas,
};
