const express = require("express");
const {
  getTarefas,
  createTarefa,
  updateTarefa,
  deleteTarefa,
  reorderTarefas,
} = require("../controllers/tarefaController");

const router = express.Router();

router.get("/", getTarefas);
router.post("/", createTarefa);
router.put("/:id", updateTarefa);
router.delete("/:id", deleteTarefa);
router.patch("/ordenar", reorderTarefas);

module.exports = router;
