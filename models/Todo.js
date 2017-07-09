
var Todo = function() {
  this.id;
  this.created_at;
  this.updated_at;
  this.content;
  this.done = false;
  this.active = true;
}


Todo.prototype.save = function() {
    var currentDate = new Date();

    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;
}



module.exports = Todo;
