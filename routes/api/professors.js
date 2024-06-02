const express = require('express');
const router = express.Router();
const professorController = require('../../controllers/professorsController')

router.route('/')
    .get(professorController.getAllProfessors)
    .post(professorController.createProfessor)
    .put(professorController.updateProfessor)
    // .delete(employeesController.deleteEmployee)

router.route('/:name')
    .get(professorController.getProfessorByName)


module.exports = router;