const Todo = require('./Todo');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
var Todos = function(uuid) {
  this.uuid = uuid;
  this.pathToDb =  path.join(__dirname, `../db/${this.uuid}.json`);
}


Todos.prototype.addTodo = function(todo, cb) {
  readFile(this.pathToDb)
  .then(data => {
    var tasks = JSON.parse(data);
    var todoObj = new Todo();
    todoObj.id = tasks.idCounter++;
    todoObj.content = todo.content;
    todoObj.save();
    tasks.tasks.push(todoObj);
    writeToDb(this.pathToDb, tasks)
      .then(result => {
        cb(null, todoObj);
      })
      .catch(err => {
        cb(err, null);
      });
  })
  .catch(err => {
    cb(err, null);
  });

}


Todos.prototype.getTodos = function() {
  var path = this.pathToDb;
  return new Promise(function(resolve, reject) {
    fs.readFile(path, { encoding : 'utf8' }, (err, data) => {
      if( err ) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}


Todos.prototype.deleteTodo = function(todo, cb) {
  readFile(this.pathToDb)
  .then(data => {
    var tasks = JSON.parse(data);
    var todoObj = _.find(tasks.tasks, { id : parseInt(todo) })
    if(todoObj) {
      todoObj.active = false;
      todoObj.updated_at = new Date();
    }
    writeToDb(this.pathToDb, tasks)
      .then(result => {
        cb(null, null);
      })
      .catch(err => {
        cb(err, null);
      });
  })
  .catch(err => {
    cb(err, null);
  });

}

Todos.prototype.editTodo = function(todoId, todo, cb) {
  todoId = parseInt(todoId);
  readFile(this.pathToDb)
  .then(data => {
    var tasks = JSON.parse(data);
    var todoObj = _.find(tasks.tasks, {id:todoId});
    if(todoObj) {
      todoObj.content = todo.content;
      todoObj.updated_at = new Date();
    }
    writeToDb(this.pathToDb, tasks)
      .then(result => {
        cb(null, null);
      })
      .catch(err => {
        cb(err, null);
      });
  })
  .catch(err => {
    cb(err, null);
  });

}


Todos.prototype.markAsDone = function(todo, cb) {
  todo = parseInt(todo);
  var contents = fs.readFileSync(this.pathToDb, 'UTF8');
  readFile(this.pathToDb)
  .then(data => {
    var tasks = JSON.parse(data);
    var todoObj = _.find(tasks.tasks, {id:todo});
    if(todoObj) {
      todoObj.done = !todoObj.done;
      todoObj.updated_at = new Date();
    }
    writeToDb(this.pathToDb, tasks)
      .then(result => {
        cb(null, null);
      })
      .catch(err => {
        cb(err, null);
      });
  })
  .catch(err => {
    cb(err, null);
  });

}


function writeToDb(path, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if( err ) {
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
}

function readFile(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, {encodeing : 'utf8'}, (err, data) => {
      if( err ) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}


module.exports = Todos;
