const Todos = require('../models/Todos');
const _ = require('lodash');

function getTodos(req, res) {
  var todos = new Todos(req.params.uid);
  todos.getTodos().then(result => {
    var ret = JSON.parse(result);
    res.status(200).json(_.filter(ret.tasks, {active : true}));
  })
  .catch(error => {
    res.status(500).json({ error : 'something went wrong' });
  });
}


function addTodo(req, res) {
  var todos = new Todos(req.params.uid);
  todos.addTodo({content : req.body.content}, function(err, task) {
    if(!err) {
      res.status(200).json(task);
    } else {
      res.status(500).json({ error : 'something went wrong' });
    }

  });
}


function editTodo(req, res) {
  var todos = new Todos(req.params.uid);
  todos.editTodo(req.params.task_id, req.body, function(err) {
    if(!err) {
        res.status(200).json('success');
    } else {
      res.status(500).json({ error : 'something went wrong' });
    }
  });
}

function markAsDone(req, res) {
  var todos = new Todos(req.params.uid);
  todos.markAsDone(req.params.task_id, function(err, task) {
    if(!err) {
      res.status(200).json('success');
    } else {
      res.status(500).json({ error : 'something went wrong' });
    }

  });
}

function deleteTodo(req, res) {
  var todos = new Todos(req.params.uid);
  todos.deleteTodo(req.params.task_id, function(err) {
    if(!err) {
        res.status(200).json('success');
    } else {
      res.status(500).json({ error : 'something went wrong' });
    }
  });
}

module.exports  = {
  getTodos : getTodos,
  addTodo : addTodo,
  editTodo : editTodo,
  markAsDone : markAsDone,
  deleteTodo : deleteTodo,
}
