const express = require('express');
const protectedRoutes = express.Router();
const TodosController = require('../controllers/todos.controller');

protectedRoutes.use(function timeLog(req, res, next) {

  if(!req.headers.authorization) {
    res.status(403).json({ 'error' : 'unauthorized' });
  }
  next();
});



protectedRoutes.get('/:uid/tasks', TodosController.getTodos);


protectedRoutes.post('/:uid/tasks', TodosController.addTodo);


protectedRoutes.put('/:uid/tasks/:task_id', TodosController.editTodo);

protectedRoutes.patch('/:uid/tasks/:task_id/done', TodosController.markAsDone);


protectedRoutes.delete('/:uid/tasks/:task_id', TodosController.deleteTodo);


protectedRoutes.get('*', function(req, res) {
  res.status(405);
});



module.exports = protectedRoutes;
